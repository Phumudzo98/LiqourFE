
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
    private offlineService: OfflineService
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

    this.completeReportForm.patchValue(this.dummyData)

    
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

     await this.offlineService.saveReport(formData, this.caseNo).then(
      () => {
        // Handle successful response
        console.log('Report saved successfully');
      },
      (error) => {
        // Handle error response
        console.error('Error saving report', error);
      }
    );
  

    let url = "https://system.eclb.co.za/eclb2/api/general/complete-inspection-report/" + this.caseNo;

    this.http.post(url, formData).subscribe(response => {
      console.log(response);
      this.spinner.hide();
    
      this.router.navigate(['/thank-you'])
      
    }, error => {
      console.log(error);
      this.spinner.hide();
    
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
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;

      console.log(this.latitude);
      console.log(this.longitude);

      this.completeReportForm.patchValue({
        latitude: this.latitude,
        longitude: this.longitude
      });
    } catch (err) {
      console.error('Error getting location', err);
    }
  }

  dummyData = {
    contactPerson: "John Doe",
    inspectionDate: "2024-05-03T08:00",
    appointmentSet: "1",
    consultedOrFound: "2",
    applicantIndicatedPersonAtPremises: "1",
    canPersonBeFound: "1",
    interestInLiquorTrade: "1",
    issuedComplience: "1",
    complaintsReceived: "2",
    rightToOccupy: "1",
    leaseAttached: "1",
    situatedInRightAddress: "1",
    inLineWithSubmittedApplication: "1",
    premisesSuitable: "1",
    ablutionFacilityInOrder: "1",
    readyForBusiness: "1",
    formServedToCorrectWardCommittee: "1",
    confirmedByCouncillor: "1",
    wardCommiteeReport: "1",
    communityConsultation: "1",
    educationalInstitution: "1",
    formServedAtEducationInstitution: "1",
    placeOfWorship: "1",
    formServedAtPlaceOfWorship: "1",
    recommendation: "1",
    futureInspectionDate: "2024-06-03T08:00",
    comments: "Everything seems to be in order.",
    latitude: "40.7128", 
    longitude: "-74.0060", 
  };
}