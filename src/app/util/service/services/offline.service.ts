import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class OfflineService{
  private storageInitialized = false;

  caseNo:any;

  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }
  

  async init() {
    await this.storage.create();
    this.storageInitialized = true;
    this.checkNetworkStatus();
  }

  async saveReport(report: any, caseNo:any) {
    if (this.storageInitialized) {
      await this.storage.set('report', report);
      console.log(report);
      this.caseNo=caseNo;
      
    }
  }

  async sendReport(report: any): Promise<Object | undefined> {
    try {
      const response = await this.http.post("https://system.eclb.co.za/eclb2/api/general/complete-inspection-report/"+this.caseNo, report).toPromise();
      await this.storage.remove('report');
      return response;
      
    } catch (error) {
      console.error('Failed to send report:', error);
      return undefined; // Return undefined in case of an error
    }
  }

  async checkNetworkStatus() {
    const status = await Network.getStatus();
    if (status.connected) {
      const report = await this.storage.get('report');
      if (report) {
        await this.sendReport(report); 
      }
    }
  }
}
