import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private storageInitialized = false;
  private reportSent = false; // Flag to track if report has been successfully sent

  constructor(private storage: Storage, private http: HttpClient) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.storageInitialized = true;
    this.checkNetworkStatus();
  }

  async saveReport(report: any) {
    if (this.storageInitialized) {
      await this.storage.set('report', report);
    }
  }

  async sendReport(report: any) {
    try {
      const response = await this.http.post('https://system.eclb.co.za/eclb2/api/general/complete-inspection-report/', report).toPromise();
      await this.storage.remove('report');
      this.reportSent = true; // Update flag when report is successfully sent
      return response;
    } catch (error) {
      console.error('Failed to send report:', error);
      return null; 
    }
  }
  
  async checkNetworkStatus() {
    const status = await Network.getStatus();
    if (status.connected && !this.reportSent) { // Check if connected and report not yet sent
      const report = await this.storage.get('report');
      if (report) {
        await this.sendReport(report);
      }
      console.log(status);
    }
  }

  isReportSent(): boolean {
    return this.reportSent;
  }
}
