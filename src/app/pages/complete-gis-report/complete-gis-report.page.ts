import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { StorageService } from 'src/app/util/service/storage.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ViewImagePage } from '../view-image/view-image.page';
import { environment } from 'src/environments/environment.prod';
import { Geolocation } from '@capacitor/geolocation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-complete-gis-report',
  templateUrl: './complete-gis-report.page.html',
  styleUrls: ['./complete-gis-report.page.scss'],
})
export class CompleteGisReportPage implements OnInit {

  selectedOption: string = '';
  reportFiles: { name: string, size: number }[] = [];
  noticeFiles: { name: string, size: number }[] = [];
  currentForm: string = 'landing';
  selectedRadioValue: string | null = null; 
  inputVisible: boolean = true; 

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  gisReportForm: FormGroup;
  caseId: any;
  caseNo: any;
  imageSources: string[] = [];
  private geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${environment.googleMapsApiKey}`;

  gisReport: any;
  reportDoc: any;
  noticeDoc: any;

  constructor(
    private router: Router,
    private eRef: ElementRef,
    private alertController: AlertController,
    private fb: FormBuilder,
    private storageService: StorageService,
    private aRoute: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private actionSheetController: ActionSheetController,
    private modalController: ModalController,
    private spinner: NgxSpinnerService
  ) {
    this.gisReportForm = this.fb.group({
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      schoolIn100m: ['', Validators.required],
      churchIn100m: ['', Validators.required],
      wardBoundriesIn100m: ['', Validators.required],
      councilorContacted: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.caseNo = param.get('caseId');
      console.log(this.caseNo);
    });

    this.getCurrentPosition();

  }

  //GISReport 
  isGisReport(){
    const areReportFilesPresent = this.reportFiles && this.reportFiles.length > 0;
    return areReportFilesPresent;
  }
    //Gis Form Valid
    isGisFormValid(): boolean {
      const gisFormFields = ['latitude', 'latitude', 'schoolIn100m','churchIn100m','wardBoundriesIn100m'];
      const areFieldsValid = gisFormFields.every(field => this.gisReportForm.get(field)?.valid);
      return areFieldsValid;
    }


  onSubmit() {
    this.spinner.show();
    let token = localStorage.getItem("userToken");
    const newHeader = {
      "Authorization": "Bearer " + token,
      "Accept": "/"
    };

    this.gisReport = this.gisReport || {};
    this.gisReport = Object.assign(this.gisReport, this.gisReportForm.value);

    const formData = new FormData();
    formData.append('gisreport', new Blob([JSON.stringify(this.gisReport)], { type: 'application/json' }));

    this.reportDoc = this.reportFiles[0];

    formData.append('report', this.report);
    


    let url = environment.eclbDomain+"api/general/save-gis-report/"+this.caseNo;

    this.http.post(url, formData).subscribe(response => {
      console.log(response);
      this.spinner.hide();
      this.router.navigate(['/thank-you'])
      
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  saveFormValues() {
    localStorage.setItem('gisReportForm', JSON.stringify(this.gisReportForm.value));
  }

  clearLocalStorageOnLoad() {
    localStorage.removeItem('gisReportForm');
  }

  loadFormValues() {
    const savedForm = localStorage.getItem('gisReportForm');
    if (savedForm) {
      this.gisReportForm.setValue(JSON.parse(savedForm));
    }
  }

  toggleForms(form: string) {
    this.currentForm = form;
    this.saveFormValues();
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  report!: File;
  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.report = file; 
       if (this.reportFiles.length > 0) {
        this.reportFiles.splice(0, 1, { name: file.name, size: file.size });
      } else {
        this.reportFiles.push({ name: file.name, size: file.size });
      }
      this.inputVisible = false; 
    }
  }

  isFileUploaded(fileName: string): boolean {
    return this.reportFiles.some(file => file.name === fileName);
  }

  navigateToBack() {
    this.aRoute.navigate(['complete-inspection']);
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
    this.reportFiles.splice(index, 1);
    if (this.reportFiles.length === 0) {
      this.inputVisible = true;
    }
  }


  isFileUploadedNotice(fileName: string): boolean {
    return this.noticeFiles.some(file => file.name === fileName);
  }

 
  async presentAlertConfirmNotice(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this document?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteItemNotice(index);
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

  deleteItemNotice(index: number) {
    this.noticeFiles.splice(index, 1);
    if (this.noticeFiles.length === 0) {
      this.inputVisible = true;
    }
  }


  latitude?: number;
  longitude?: number;

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;

      console.log(this.latitude);
      console.log(this.longitude);

      if(this.latitude<=-31 && this.latitude>=-34 && this.longitude>=24 && this.longitude<=34)
        {
        this.gisReportForm.patchValue({
          latitude: this.latitude,
          longitude: this.longitude
        });
  }
      else{
        
        this.gisReportForm.patchValue({
          latitude: "Out of bounds",
          longitude: "Out of bounds"
        });
        
     
      }
    } catch (err) {
      console.error('Error getting location', err);
    }
  }

 
}

