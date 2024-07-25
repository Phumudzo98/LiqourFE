import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geolocation, PositionOptions } from '@capacitor/geolocation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { headersSecure } from 'src/app/util/service/const';
import { CompleteGISReport } from 'src/app/util/service/model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.page.html',
  styleUrls: ['./update-location.page.scss'],
})
export class UpdateLocationPage implements OnInit {

  latitude?: number;
  longitude?: number;
  
  selectedOption: string = '';
  uploadedFiles: { name: string, size: number }[] = [];
  currentForm: string = 'landing';
  
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  caseId: any;

  reportDoc: any;
  reportFiles: { name: string, size: number }[] = [];
  report2 = new CompleteGISReport();

  gisReportForm: FormGroup;
  gisReport!: { file: File, documentType: string };

  constructor(
    private router: Router,
    private eRef: ElementRef,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { 
    this.gisReportForm = this.formBuilder.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      schoolIn100m: ['', Validators.required],
      churchIn100m: ['', Validators.required],
      wardBoundriesIn100m: ['', Validators.required],
      councilorContacted: ['1', Validators.required]
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

      this.gisReportForm.patchValue({
        latitude: this.latitude.toString(), // Convert number to string
        longitude: this.longitude.toString() // Convert number to string
      });

      this.saveLastKnownLocation(this.latitude, this.longitude);
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
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.gisReport = { file, documentType: 'report' };
      if (this.reportFiles.length > 0) {
        this.reportFiles.splice(0, 1, { name: file.name, size: file.size });
      } else {
        this.reportFiles.push({ name: file.name, size: file.size });
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
    this.router.navigate(['complete-inspection']);
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
        }
      ]
    });

    await alert.present();
  }

  deleteItem(index: number) {
    this.uploadedFiles.splice(index, 1);
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

    this.spinner.show();
    this.report = Object.assign(this.report, this.gisReportForm.value);
    const formData = new FormData();
    formData.append('gisreport', new Blob([JSON.stringify(this.report)], { type: 'application/json' }));

    if (this.gisReport) {
      formData.append('report', this.gisReport.file);
    }

    this.http.post(url + this.caseId, formData, { headers: headersSecure }).subscribe(response => {
      this.spinner.hide();
      console.log("submitted");
      setTimeout(() => {
        this.router.navigateByUrl('/inbox');
      }, 5000);
    }, error => {

      this.spinner.hide();
      console.error(error);
      console.log(this.gisReportForm);
      console.log(this.gisReport.file)
    });
  }

  public getControl(controlName: string): FormControl { 
    return this.gisReportForm.get(controlName) as FormControl; 
  }

  public onGISSelected(event: { file: File, documentType: string }) {
    this.gisReport = event;
  }
}
