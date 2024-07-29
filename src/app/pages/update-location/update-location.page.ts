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

  ngOnInit() {
    this.loadLastKnownLocation();

    const token = localStorage.getItem("userToken");
    this.activatedRoute.paramMap.subscribe(param => {
      this.caseId = param.get('caseId');
      console.log(this.caseId);
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

      if(this.latitude<=-31 && this.latitude>=-34 && this.longitude>=24 && this.longitude<=34)
        {
        this.gisReportForm.patchValue({
          latitude: this.latitude,
          longitude: this.longitude
        });
  
        this.saveLastKnownLocation(this.latitude, this.longitude);
      }
      else{
        
        this.gisReportForm.patchValue({
          latitude: "Out of bounds",
          longitude: "Out of bounds"
        });
        this.saveLastKnownLocation(0, 0);
     
      }
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        console.error('Error getting location', error);
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
        latitude: this.latitude.toString(), // Convert number to string
        longitude: this.longitude.toString() // Convert number to string
      });
    }
  }

  toggleForms(form: string) {
    this.currentForm = form;
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
  
  deleteItem(index: number) {
    if (index > -1) {
      this.reportFiles.splice(index, 1);
    }
  }
  
  selectFileReport(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = ".docx, .pdf";
    fileInput.onchange = (event: Event) => this.onFileSelected(event);
    fileInput.click();
  }

  report = new CompleteGISReport();
  submitGISReport(): void {
    let url = "http://localhost:8081/api/general/save-gis-report/";
    if (this.gisReportForm.invalid || !this.gisReport) {
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


  

  public getControl(controlName: string): FormControl { 
    return this.gisReportForm.get(controlName) as FormControl; 
  }

  public onGISSelected(event: { file: File, documentType: string }) {
    this.gisReport = event;
  }
}
