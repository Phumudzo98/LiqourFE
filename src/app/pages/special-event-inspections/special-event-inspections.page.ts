
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
  selector: 'app-special-event-inspections',
  templateUrl: './special-event-inspections.page.html',
  styleUrls: ['./special-event-inspections.page.scss'],
})
export class SpecialEventInspectionsPage implements OnInit {
    selectedOption: string = '';
    reportFiles: { name: string, size: number }[] = [];
    noticeFiles: { name: string, size: number }[] = [];
    currentForm: string = 'landing';
    selectedRadioValue: string | null = null; 
    inputVisible: boolean = true; 
    isNetworkConnected: boolean = true; // Flag to track network status
    dateFormatPlaceholder: string = "YYYY-MM-DD";
    @ViewChild('fileInput', { static: false })
    fileInput!: ElementRef<HTMLInputElement>;
  
    completeReportForm: FormGroup;
    caseId: any;
    caseNo: any;
    imageSources: string[] = [];
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
        /*
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
        comments: ['']*/

  currentOutletName: ['', Validators.required],
  willNameChange: ['', Validators.required],
  personContacted: ['', Validators.required],
  inspectionDate: ['', Validators.required],
  latitude:['', Validators.required],
  longitude: ['', Validators.required],

  appointmentSet: ['', Validators.required],
  personConsulted: ['', Validators.required],
  indicatedParticularPerson:['', Validators.required],
  personFoundConfirmed: ['', Validators.required],

  rightToOccupy: ['', Validators.required],//
  premisesInIndicatedAddress: ['', Validators.required],//
  premiseInLineWithPlan: ['', Validators.required],//
  premisesSuitedForCategory: ['', Validators.required],//
  abulutionFacilityWorking: ['', Validators.required],//
  readyToCommenceWithBusiness: ['', Validators.required],//
  lease: ['', Validators.required],


  formServedToWardCommittee: ['', Validators.required],
  formServedToWardCouncillor: ['', Validators.required],
  wardCommitteReport: ['', Validators.required],
  communityConsulted: ['', Validators.required],
  educationalInstitutionWithin100m: ['', Validators.required],
  formServedAtEducationalInstitution: ['', Validators.required],
  placeOfWorshipWithin100m: ['', Validators.required],
  formServedAtPlaceOfWorship: ['', Validators.required],


  recommendationForRegistration: ['', Validators.required],
  comments: ['', Validators.required],
  futurePreInspectionDate: ['', Validators.required],
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
      const generalFields = ['personContacted', 'inspectionDate', 'latitude', 'longitude'];
      return generalFields.every(field => this.completeReportForm.get(field)?.valid);
    }

    //Business Conduct Valid
    isBusinessConductValid(): boolean {
      const businessFields = ['willNameChange'];
      return businessFields.every(field => this.completeReportForm.get(field)?.valid);
    }
    //Applicant Valid
    isApplicantFormValid(): boolean {
      const applicantFields = ['appointmentSet', 'personConsulted', 'indicatedParticularPerson', 'personFoundConfirmed'];
      return applicantFields.every(field => this.completeReportForm.get(field)?.valid);
    }
  
    //Documentation Valid
    isDocumentationFormValid(): boolean {
      const documentationFields = ['rightToOccupy', 'premisesInIndicatedAddress', 'premisesSuitedForCategory', 'premiseInLineWithPlan', 'lease','abulutionFacilityWorking', 'readyToCommenceWithBusiness'];
      return documentationFields.every(field => this.completeReportForm.get(field)?.valid);
    }
  
    //Documentation Valid
    isCommunityFormValid(): boolean {
      const communityFields = [ 'formServedToWardCommittee',
      'formServedToWardCouncillor',
      'wardCommitteReport',
      'communityConsulted',
      'educationalInstitutionWithin100m',
      'formServedAtEducationalInstitution',
      'placeOfWorshipWithin100m',
      'formServedAtPlaceOfWorship'];
      return communityFields.every(field => this.completeReportForm.get(field)?.valid);
    }
  
     //Recommendation Valid
     isRecommendationFormValid(): boolean {
      const recommendationFields = ['recommendationForRegistration', 'comments', 'futurePreInspectionDate'];
      return recommendationFields.every(field => this.completeReportForm.get(field)?.valid);
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

      let url = environment.eclbDomain+"api/general/universal-complete-report/" + this.caseNo;
  
      this.http.post(url, this.completeReportForm.value).subscribe(response => {
        console.log(response);
        this.spinner.hide();
        console.log(this.completeReportForm.value);
        this.router.navigate(['/thank-you-2']);
        
      }, error => {
        console.log(error);
        this.spinner.hide();
      
         this.offlineService.saveReport(this.completeReportForm.value, this.caseNo).then(
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
    ToObject(formData: FormData): any {
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
        this.imageSources.push(image.dataUrl);
      }
    }
  
    dropdownVisible: { [index: string]: boolean } = {};
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
      const index = this.imageSources.indexOf(imageUrl);
      if (index !== -1) {
        this.imageSources.splice(index, 1);
        this.dropdownVisible[index] = false;
      }
    }
  
    async showOptions(imageUrl: string) {
      const alert = await this.alertController.create({
        header: 'Options',
        message: 'Choose an action for this image:',
        buttons: [
          {
            text: 'View',
            handler: () => {
              console.log('View clicked for:', imageUrl);
            }
          },
          {
            text: 'Delete',
            cssClass: 'danger',
            handler: () => {
              console.log('Delete clicked for:', imageUrl);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
  
      await alert.present();
    }
  
    viewImageUrl: string | null = null;
  
    async viewImage(image: string) {
      const modal = await this.modalController.create({
        component: ViewImagePage,
        componentProps: { image },
        backdropDismiss: true
      });
      return await modal.present();
    }
  
    async dismissModal() {
      this.viewImageUrl = null;
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
  
        this.completeReportForm.patchValue({
          latitude: this.latitude,
          longitude: this.longitude
        });
  
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