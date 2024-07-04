import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Network } from '@capacitor/network';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private storageInitialized = false;
  private networkStatus = new BehaviorSubject<boolean>(true);

  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
    this.monitorNetworkStatus();
  }

  async init() {
    try {
      await this.storage.create();
      this.storageInitialized = true;
      console.log('Storage initialized successfully.');
    } catch (error) {
      console.error('Error initializing storage:', error);
    }
  }

  monitorNetworkStatus() {
    Network.addListener('networkStatusChange', status => {
      this.networkStatus.next(status.connected);
      console.log('Network status changed:', status.connected);
      if (status.connected) {
        this.sendPendingReports();
      }
    });

    Network.getStatus().then(status => {
      this.networkStatus.next(status.connected);
      console.log('Initial network status:', status.connected);
      if (status.connected) {
        this.sendPendingReports();
      }
    }).catch(error => {
      console.error('Error getting initial network status:', error);
    });
  }

  async saveReport(report: FormData, caseNo: string) {
    if (this.storageInitialized) {
      try {
        const serializedReport = await serializeFormData(report);
        await this.storage.set('report', serializedReport);
        await this.storage.set('caseNo', caseNo);
        console.log('Report saved locally:', serializedReport);

        if (this.networkStatus.getValue()) {
          this.sendReport(serializedReport, caseNo);
        }
      } catch (error) {
        console.error('Error saving report:', error);
      }
    } else {
      console.error('Storage is not initialized.');
    }
  }

  private async sendPendingReports() {
    try {
      const report = await this.storage.get('report');
      const caseNo = await this.storage.get('caseNo');

      if (report && caseNo) {
        this.sendReport(report, caseNo);
      } else {
        console.log('No pending reports to send.');
      }
    } catch (error) {
      console.error('Error sending pending reports:', error);
    }
  }

  private async sendReport(report: any, caseNo: string) {
    try {
      const formData = deserializeFormData(report);

      // Log the contents of the FormData object
      console.log('FormData contents:');
      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      this.http.post(`https://system.eclb.co.za/eclb2/api/general/complete-inspection-report/${caseNo}`, formData).subscribe(
        response => {
          console.log('Report sent successfully', response);
          this.clearStoredReport();
        },
        error => {
          console.error('Error sending report:', error);
        }
      );
    } catch (error) {
      console.error('Error during report sending:', error);
    }
  }

  private async clearStoredReport() {
    try {
      await this.storage.remove('report');
      await this.storage.remove('caseNo');
      console.log('Stored report cleared.');
    } catch (error) {
      console.error('Error clearing stored report:', error);
    }
  }
}

// Utility functions
function getFormDataEntries(formData: FormData): [string, FormDataEntryValue][] {
  const entries: [string, FormDataEntryValue][] = [];
  formData.forEach((value, key) => {
    entries.push([key, value]);
  });
  return entries;
}

async function serializeFormData(formData: FormData): Promise<any> {
  const obj: any = {};
  const entries = getFormDataEntries(formData);

  for (const [key, value] of entries) {
    if (value instanceof File) {
      obj[key] = {
        fileName: value.name,
        fileType: value.type,
        fileSize: value.size,
        fileContent: await readFileAsDataURL(value),
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

function deserializeFormData(serializedData: any): FormData {
  const formData = new FormData();
  for (const key in serializedData) {
    if (serializedData[key].fileName) {
      const blob = dataURLToBlob(serializedData[key].fileContent);
      const file = new File([blob], serializedData[key].fileName, { type: serializedData[key].fileType });
      formData.append(key, file);
    } else {
      formData.append(key, serializedData[key]);
    }
  }
  return formData;
}

function dataURLToBlob(dataURL: string): Blob {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}