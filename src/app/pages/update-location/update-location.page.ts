import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { headers, headersSecure } from 'src/app/util/service/const';
import { CompleteGISReport } from 'src/app/util/service/model';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.page.html',
  styleUrls: ['./update-location.page.scss'],
})
export class UpdateLocationPage implements OnInit {

  latitude?: number;
  longitude?: number;
  gisReportForm: FormGroup;

  selectedOption: string = '';
  uploadedFiles: { name: string, size: number }[] = [];
  currentForm: string = 'landing';
  
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private route: Router,
    private eRef: ElementRef,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: ActivatedRoute
  ) {
    this.gisReportForm = this.formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      schoolIn100m: ['', Validators.required],
      churchIn100m: ['', Validators.required],
      wardBoundriesIn100m: ['', Validators.required],
    });
  }

  caseId:any

  ngOnInit() {
    this.loadLastKnownLocation();
    
    let token = localStorage.getItem("userToken") 
    this.router.paramMap.subscribe(param => {

      this.caseId = param.get('caseId');

      console.log(this.caseId);
      
      
    const newHeader={
      "Authorization":"Bearer "+token, 
      "Accept":"*/*"
    }
      
      
    });

  }

  async getCurrentPosition() {
    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    try {
      const coordinates = await Geolocation.getCurrentPosition(options);
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;

      this.gisReportForm.patchValue({
        latitude: this.latitude,
        longitude: this.longitude
      });

      // Save the last known location
      this.saveLastKnownLocation(this.latitude, this.longitude);

    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        console.error('Error getting location', error);
        // Check for specific error codes and handle them
        if (error.code === 1) {
          await this.presentAlert('Permission Denied', 'Location access was denied.');
        } else if (error.code === 2) {
          await this.presentAlert('Position Unavailable', 'Unable to determine location.');
          this.loadLastKnownLocation();
        } else if (error.code === 3) {
          await this.presentAlert('Timeout', 'Location request timed out.');
        } else {
          await this.presentAlert('Error', 'An unexpected error occurred while getting location.');
        }
      } else {
        console.error('An unknown error occurred', error);
      }
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  saveLastKnownLocation(lat: number, lon: number) {
    localStorage.setItem('lastKnownLatitude', lat.toString());
    localStorage.setItem('lastKnownLongitude', lon.toString());
  }

  loadLastKnownLocation() {
    const lastLat = localStorage.getItem('lastKnownLatitude');
    const lastLon = localStorage.getItem('lastKnownLongitude');

    if (lastLat && lastLon) {
      this.latitude = parseFloat(lastLat);
      this.longitude = parseFloat(lastLon);
      this.gisReportForm.patchValue({
        latitude: this.latitude,
        longitude: this.longitude
      });
    }
  }

  toggleForms(form: string) {
    this.currentForm = form;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (this.isFileUploaded(file.name)) {
        await this.presentFileExistsAlert();
      } else {
        this.uploadedFiles.push({ name: file.name, size: file.size });
      }
    }
  }

  isFileUploaded(fileName: string): boolean {
    return this.uploadedFiles.some(file => file.name === fileName);
  }

  async presentFileExistsAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Document already uploaded.',
      buttons: ['OK']
    });

    await alert.present();
  }

  navigateToBack() {
    this.route.navigate(['complete-inspection']);
  }

  async presentAlertConfirm(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this document?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(index);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
      ]
    });

    await alert.present();
  }

  deleteItem(index: number) {
    this.uploadedFiles.splice(index, 1);
  }

  formData = new FormData();
  report = new CompleteGISReport();

  onSubmit() {
    let url = "http://localhost:8081/api/general/save-gis-report";

    // this.formData.append('outletId', '23456');
    // this.formData.append('longitude', this.longitude?.toString() || '');
    // this.formData.append('latitude', this.latitude?.toString() || '');

    this.report = Object.assign(this.report, this.gisReportForm.value);
    const formData = new FormData();
    formData.append('gisreport', new Blob([JSON.stringify(this.report)], { type: 'application/json' }));

    
    
    this.http.post(url+this.caseId, formData, { headers: headersSecure }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
