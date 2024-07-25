
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, PopoverController } from '@ionic/angular';
import { StorageService } from 'src/app/util/service/storage.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ViewImagePage } from '../view-image/view-image.page';
import { environment } from 'src/environments/environment.prod';
import { Geolocation } from '@capacitor/geolocation';
import { NgxSpinnerService } from 'ngx-spinner';
import { OfflineService } from 'src/app/util/service/services/offline.service';

@Component({
  selector: 'app-complete-inspection',
  templateUrl: './complete-inspection.page.html',
  styleUrls: ['./complete-inspection.page.scss'],
})
export class CompleteInspectionPage implements OnInit {
  selectedOption: string = '';
  reportFiles: { name: string, size: number }[] = [];
  noticeFiles: { name: string, size: number }[] = [];
  currentForm: string = 'landing';
  selectedRadioValue: string | null = null; 
  inputVisible: boolean = true; 
  isNetworkConnected: boolean = true; // Flag to track network status
  dateFormatPlaceholder: string = "YYYY-MM-DD";

  imageSources: { src: string, description: string }[] = [];
  dropdownVisible: { [index: string]: boolean } = {};

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  completeReportForm: FormGroup;
  caseId: any;
  caseNo: any;

  private geocodeUrl = "https://maps.googleapis.com/maps/api/geocode/json?key=${environment.googleMapsApiKey}";

  inspectionReport: any;
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
    private spinner: NgxSpinnerService,
    private offlineService: OfflineService,
    private popoverController: PopoverController
  ) {
    this.completeReportForm = this.fb.group({
      contactPerson: ['', Validators.required],
      inspectionDate: ['', Validators.required],
      appointmentSet: ['', Validators.required],
      consultedOrFound: ['', Validators.required],
      applicantIndicatedPersonAtPremises: ['', Validators.required],
      canPersonBeFound: [Validators.required],
      interestInLiquorTrade: ['', Validators.required],
      issuedComplience: ['', Validators.required],
      complaintsReceived: ['', Validators.required],
      rightToOccupy: ['', Validators.required],
      leaseAttached: ['', Validators.required],
      situatedInRightAddress: ['', Validators.required],
      inLineWithSubmittedApplication: ['', Validators.required],
      premisesSuitable: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      ablutionFacilityInOrder: ['', Validators.required],
      readyForBusiness: ['', Validators.required],
      formServedToCorrectWardCommittee: ['', Validators.required],
      confirmedByCouncillor: ['', Validators.required],
      wardCommiteeReport: ['', Validators.required],
      communityConsultation: ['', Validators.required],
      educationalInstitution: ['', Validators.required],
      formServedAtEducationInstitution: ['', Validators.required],
      placeOfWorship: ['', Validators.required],
      formServedAtPlaceOfWorship: ['', Validators.required],
      recommendation: ['', Validators.required],
      futureInspectionDate: ['', Validators.required],
      comments: ['']
    });

  
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.caseNo = param.get('caseId');
      console.log(this.caseNo);
    });

    this.getCurrentPosition();

  }

  
  //General Valid
  isGeneralFormValid(): boolean {
    const generalFields = ['contactPerson', 'inspectionDate', 'latitude', 'longitude'];
    return generalFields.every(field => this.completeReportForm.get(field)?.valid);
  }
  //Applicant Valid
  isApplicantFormValid(): boolean {
    const applicantFields = ['appointmentSet', 'consultedOrFound', 'applicantIndicatedPersonAtPremises', 'canPersonBeFound', 'interestInLiquorTrade','issuedComplience', 'complaintsReceived'];
    return applicantFields.every(field => this.completeReportForm.get(field)?.valid);
  }

  //Documentation Valid
  isDocumentationFormValid(): boolean {
    const documentationFields = ['rightToOccupy', 'leaseAttached', 'situatedInRightAddress', 'inLineWithSubmittedApplication', 'premisesSuitable','ablutionFacilityInOrder', 'readyForBusiness'];
    return documentationFields.every(field => this.completeReportForm.get(field)?.valid);
  }

  //Documentation Valid
  isCommunityFormValid(): boolean {
    const communityFields = ['formServedToCorrectWardCommittee', 'confirmedByCouncillor', 'wardCommiteeReport', 'communityConsultation', 'educationalInstitution','formServedAtEducationInstitution', 'placeOfWorship', 'formServedAtPlaceOfWorship'];
    return communityFields.every(field => this.completeReportForm.get(field)?.valid);
  }

   //Recommendation Valid
   isRecommendationFormValid(): boolean {
    const recommendationFields = ['recommendation', 'futureInspectionDate', 'comments'];
    const areFieldsValid = recommendationFields.every(field => this.completeReportForm.get(field)?.valid);
    const areNoticeFilesPresent = this.noticeFiles && this.noticeFiles.length > 0;
    return areFieldsValid && areNoticeFilesPresent;
  }

  //InspectionReport 
  isInspectionReport(){
    const areReportFilesPresent = this.reportFiles && this.reportFiles.length > 0;
    return areReportFilesPresent;
  }
 

  async onSubmit() {
    this.spinner.show();
    let token = localStorage.getItem("userToken");
    const newHeader = {
      "Authorization": "Bearer " + token,
      "Accept": "/"
    };

    this.inspectionReport = this.inspectionReport || {};
    this.inspectionReport = Object.assign(this.inspectionReport, this.completeReportForm.value);

    const formData = new FormData();
    formData.append('inspection', new Blob([JSON.stringify(this.inspectionReport)], { type: 'application/json' }));

    this.reportDoc = this.reportFiles[0];
    formData.append('report', this.report);

    this.noticeDoc = this.noticeFiles[0];
    formData.append('notice', this.notice);


    let url = "https://system.eclb.co.za/eclb2/api/general/complete-inspection-report/" + this.caseNo;

    this.http.post(url, formData).subscribe(response => {
      console.log(response);
      this.spinner.hide();
    
      this.router.navigate(['/thank-you'])
      
    }, error => {
      console.log(error);
      this.spinner.hide();
    
       this.offlineService.saveReport(formData, this.caseNo).then(
        () => {
          // Handle successful response
          console.log('Report saved successfully');
        },
        (error) => {
          // Handle error response
          console.error('Error saving report', error);
        }
      );
    
    });
  }
  
  

  resendDataIfNeeded() {
    if (this.isNetworkConnected && this.completeReportForm.valid) {
      this.onSubmit();
    }
  }
  formDataToObject(formData: FormData): any {
    const obj: any = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }
  

  saveFormValues() {
    localStorage.setItem('completeReportForm', JSON.stringify(this.completeReportForm.value));
  }

  clearLocalStorageOnLoad() {
    localStorage.removeItem('completeReportForm');
  }

  loadFormValues() {
    const savedForm = localStorage.getItem('completeReportForm');
    if (savedForm) {
      this.completeReportForm.setValue(JSON.parse(savedForm));
    }
  }

  toggleForms(form: string) {
    this.currentForm = form;
    this.saveFormValues();
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }
  selectFileReport(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = ".docx, .pdf"; // Adjust as needed for file types
    fileInput.onchange = (event: Event) => this.onFileSelected(event);
    fileInput.click();
  }
  selectFileNotice(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = ".docx, .pdf"; // Adjust as needed for file types
    fileInput.onchange = (event: Event) => this.onFileSelectedRecommendation(event);
    fileInput.click();
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

  notice!: File;
  async onFileSelectedRecommendation(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.notice = file;
      if (this.noticeFiles.length > 0) {
        this.noticeFiles.splice(0, 1, { name: file.name, size: file.size });
      } else {
        this.noticeFiles.push({ name: file.name, size: file.size });
      }
      this.inputVisible = false; 
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

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Photos',
          icon: 'image',
          handler: () => {
            this.selectImage(CameraSource.Photos);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.selectImage(CameraSource.Camera);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });
    await actionSheet.present();
  }

  async selectImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: source
    });
    if (image.dataUrl) {
      const description = await this.promptForDescription();
      if (description !== null) {
        this.imageSources.push({ src: image.dataUrl, description });
      }
    }
  }

  async promptForDescription(): Promise<string | null> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Add Description',
        inputs: [
          {
            name: 'description',
            type: 'text',
            placeholder: 'Enter image description'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(null);
            }
          },
          {
            text: 'Save',
            handler: (data) => {
              resolve(data.description);
            }
          }
        ]
      });
      await alert.present();
    });
  }
 
  toggleDropdown(event: Event, index: number) {
    event.stopPropagation();
    this.dropdownVisible[index] = !this.dropdownVisible[index];
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    Object.keys(this.dropdownVisible).forEach(user => {
      if (this.dropdownVisible[user] && !this.eRef.nativeElement.querySelector('.label').contains(event.target)) {
        this.dropdownVisible[user] = false;
      }
    });
  }

  async deleteImage(imageUrl: string) {
    const alert = await this.createDeleteAlert(imageUrl);
    await alert.present();
  }

  private async createDeleteAlert(imageUrl: string) {
    return this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this image?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary-button',
          handler: () => {
            console.log('Cancel delete');
          }
        },
        {
          text: 'Yes',
          cssClass: 'primary-button',
          handler: () => {
            this.removeImage(imageUrl);
            console.log('Confirm delete');
          }
        }
      ]
    });
  }

  private removeImage(imageUrl: string) {
    const index = this.imageSources.findIndex(image => image.src === imageUrl);
    if (index !== -1) {
      this.imageSources.splice(index, 1);
      this.dropdownVisible[index] = false;
    }
  }

  async viewImage(image: string) {
    const modal = await this.modalController.create({
      component: ViewImagePage,
      componentProps: { image },
      backdropDismiss: true // This enables clicking outside the modal to dismiss it
    });
    return await modal.present();
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  latitude?: number;
  longitude?: number;

  async getCurrentPosition() {

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;


      if(this.latitude<=-31 && this.latitude>=-34 && this.longitude>=24 && this.longitude<=34)
      {
      this.completeReportForm.patchValue({
        latitude: this.latitude,
        longitude: this.longitude
      });

      this.saveLastKnownLocation(this.latitude, this.longitude);
    }
    else{
      
      this.completeReportForm.patchValue({
        latitude: "Out of bounds",
        longitude: "Out of bounds"
      });
      this.saveLastKnownLocation(0, 0);
   
    }

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
    } else{
      console.error('An unknown error occurred', error);
    }
  }
  
}

  saveLastKnownLocation(lat: number, lon: number) {
    localStorage.setItem('lastKnownLatitude', lat.toString());
    localStorage.setItem('lastKnownLongitude', lon.toString());
  }

  
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  radioClicked(formControlName: string, value: string) {
    this.completeReportForm.patchValue({
      [formControlName]: value
    });
  }

  loadLastKnownLocation() {
    const lastLat = localStorage.getItem('lastKnownLatitude');
    const lastLon = localStorage.getItem('lastKnownLongitude');

    if (lastLat && lastLon) {
      this.latitude = parseFloat(lastLat);
      this.longitude = parseFloat(lastLon);
      this.completeReportForm.patchValue({
        latitude: this.latitude,
        longitude: this.longitude
      });
    }
  }
 
  openDatetimePicker() {
    const button = document.getElementById('open-datetime');
    if (button) {
      button.click();
    }
  }

  dateChanged(event: any) {
    const date = event.detail.value;
    const input = document.getElementById('inspection-date-input') as HTMLInputElement;
    if (input) {
      input.value = date;
    }
    this.completeReportForm.get('futureInspectionDate')?.setValue(date);
  }
  dateChanged1(event: any) {
    const date = event.detail.value;
    const input = document.getElementById('inspection-date-input') as HTMLInputElement;
    if (input) {
      input.value = date;
    }
    this.completeReportForm.get('inspectionDate')?.setValue(date);
  }
  closePopover() {
    this.popoverController.dismiss();
  }

  
}