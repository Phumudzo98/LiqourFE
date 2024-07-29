// update-location.page.ts
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.page.html',
  styleUrls: ['./update-location.page.scss']
})
export class UpdateLocationPage implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef<HTMLInputElement> | undefined;
  gisReportForm!: FormGroup;
  reportFiles: File[] = [];
  caseId: string = ''; // Ensure this is set appropriately
  private apiUrl = 'http://localhost:8081/api/general/save-gis-report/2901139';
  private headersSecure = new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.gisReportForm = this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      schoolIn100m: ['', Validators.required],
      churchIn100m: ['', Validators.required],
      wardBoundriesIn100m: ['', Validators.required],
      councilorContacted:['',Validators.required]
    });
  }

  triggerFileInput() {
    this.fileInput?.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.reportFiles = [file];
    }
  }

  async presentAlertConfirm(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this file?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Delete',
          handler: () => {
            this.reportFiles.splice(index, 1);
          }
        }
      ]
    });

    await alert.present();
  }

  async submitGISReport() {
    if (this.gisReportForm.invalid || this.reportFiles.length === 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Please fill all required fields and upload a file.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Submitting...'
    });
    await loading.present();

    const formData = new FormData();
    formData.append('caseId', this.gisReportForm.get('caseId')?.value ?? '');
    formData.append('latitude', this.gisReportForm.get('latitude')?.value ?? '');
    formData.append('longitude', this.gisReportForm.get('longitude')?.value ?? '');
    formData.append('schoolIn100m', this.gisReportForm.get('schoolIn100m')?.value ?? '');
    formData.append('churchIn100m', this.gisReportForm.get('churchIn100m')?.value ?? '');
    formData.append('wardBoundriesIn100m', this.gisReportForm.get('wardBoundriesIn100m')?.value ?? '');
    formData.append('file', this.reportFiles[0]);

    // Ensure caseId is included in the URL
    this.http.post(`${this.apiUrl}`, formData, { headers: this.headersSecure }).subscribe(
      async response => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Success',
          message: 'GIS Report submitted successfully.',
          buttons: ['OK']
        });
        await alert.present();
      },
      async error => {
        console.log(error)
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'There was an error submitting the report. Please try again.',
          buttons: ['OK']
        });
        await alert.present();
      }
    );
  }

  getCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.gisReportForm.patchValue({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
}
