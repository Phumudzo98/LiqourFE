import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { headersSecure } from 'src/app/util/service/const';
import { StorageService } from 'src/app/util/service/storage.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { ViewImagePage } from '../view-image/view-image.page';

@Component({
  selector: 'app-complete-inspection',
  templateUrl: './complete-inspection.page.html',
  styleUrls: ['./complete-inspection.page.scss'],
})
export class CompleteInspectionPage implements OnInit {

  selectedOption: string = '';
  uploadedFiles: { name: string, size: number }[] = [];
  currentForm: string = 'landing';
  selectedRadioValue: string | null = null; // Initialize to null or the default value you want
  inputVisible: boolean = true; // Add this property

  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  completeReportForm: FormGroup;
  caseId: any;
  caseNo: any;
  imageSources: string[] = [];

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
  ) {
    this.completeReportForm = this.fb.group({
      personContacted: ['', Validators.required],
      inspectionDate: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      interestInLiquorTrade: ['', [Validators.required]],
      issuedComplience: ['', [Validators.required]],
      complaintsReceived: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      appointmentSet: ['', Validators.required],
      personConsulted: ['', Validators.required],
      indicatedParticularPerson: ['', [Validators.required]],
      personFoundConfirmed: ['', [Validators.required]],
      rightToOccupy: ['', [Validators.required]],
      formServedToWardCommittee: ['', Validators.required],
      formServedToWardCouncillor: ['', [Validators.required]],
      wardCommitteReport: ['', [Validators.required]],
      communityConsulted: ['', [Validators.required]],
      educationalInstitutionWithin100m: ['', [Validators.required]],
      premisesInIndicatedAddress: ['', [Validators.required]],
      formServedAtEducationalInstitution: ['', [Validators.required]],
      placeOfWorshipWithin100m: ['', [Validators.required]],
      formServedAtPlaceOfWorship: ['', [Validators.required]],
      recommendationForRegistration: ['', Validators.required],
      comments: ['', Validators.required],
      futurePreInspectionDate: ['', Validators.required],
      lease: ['', Validators.required],
      premiseInLineWithPlan: ['', Validators.required],
      premisesSuitedForCategory: ['', Validators.required],
      abulutionFacilityWorking: ['', Validators.required],
      readyToCommenceWithBusiness: ['', Validators.required],
      recommendation: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.caseNo = param.get('caseId');
      console.log(this.caseNo);
    });
  }

  onSubmit() {
    console.log(this.completeReportForm.value);
    // Perform other actions here, like sending the data to the backend

    let formValues = {
      "inspection": {
        personContacted: this.completeReportForm.get('personContacted')?.value,
        inspectionDate: this.completeReportForm.get('inspectionDate')?.value,
        latitude: this.completeReportForm.get('latitude')?.value,
        interestInLiquorTrade: this.completeReportForm.get('interestInLiquorTrade')?.value,
        issuedComplience: this.completeReportForm.get('issuedComplience')?.value,
        complaintsReceived: this.completeReportForm.get('complaintsReceived')?.value,
        longitude: this.completeReportForm.get('longitude')?.value,
        appointmentSet: this.completeReportForm.get('appointmentSet')?.value,
        personConsulted: this.completeReportForm.get('personConsulted')?.value,
        indicatedParticularPerson: this.completeReportForm.get('indicatedParticularPerson')?.value,
        personFoundConfirmed: this.completeReportForm.get('personFoundConfirmed')?.value,
        rightToOccupy: this.completeReportForm.get('rightToOccupy')?.value,
        formServedToWardCommittee: this.completeReportForm.get('formServedToWardCommittee')?.value,
        formServedToWardCouncillor: this.completeReportForm.get('formServedToWardCouncillor')?.value,
        wardCommitteReport: this.completeReportForm.get('wardCommitteReport')?.value,
        communityConsulted: this.completeReportForm.get('communityConsulted')?.value,
        educationalInstitutionWithin100m: this.completeReportForm.get('educationalInstitutionWithin100m')?.value,
        premisesInIndicatedAddress: this.completeReportForm.get('premisesInIndicatedAddress')?.value,
        formServedAtEducationalInstitution: this.completeReportForm.get('formServedAtEducationalInstitution')?.value,
        placeOfWorshipWithin100m: this.completeReportForm.get('placeOfWorshipWithin100m')?.value,
        formServedAtPlaceOfWorship: this.completeReportForm.get('formServedAtPlaceOfWorship')?.value,
        recommendationForRegistration: this.completeReportForm.get('recommendationForRegistration')?.value,
        comments: this.completeReportForm.get('comments')?.value,
        futurePreInspectionDate: this.completeReportForm.get('futurePreInspectionDate')?.value,
        lease: this.completeReportForm.get('lease')?.value,
        premiseInLineWithPlan: this.completeReportForm.get('premiseInLineWithPlan')?.value,
        premisesSuitedForCategory: this.completeReportForm.get('premisesSuitedForCategory')?.value,
        abulutionFacilityWorking: this.completeReportForm.get('abulutionFacilityWorking')?.value,
        readyToCommenceWithBusiness: this.completeReportForm.get('readyToCommenceWithBusiness')?.value,
        recommendation: this.completeReportForm.get('recommendation')?.value
      },
      "report": "",
      "notice": ""
    };

    let token = localStorage.getItem("userToken")
    const newHeader = {
      "Authorization": "Bearer " + token,
      "Accept": "*/*"
    }

    let url = "https://system.eclb.co.za/eclb2/api/general/complete-inspection-report/" + this.caseNo

    this.http.post(url, formValues, { headers: newHeader }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
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

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (this.isFileUploaded(file.name)) {
        await this.presentFileExistsAlert();
      } else {
        this.uploadedFiles.push({ name: file.name, size: file.size });
        this.inputVisible = false; // Hide the input
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
    this.uploadedFiles.splice(index, 1);
    if (this.uploadedFiles.length === 0) {
      this.inputVisible = true; // Show the input if all files are deleted
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
            // Handle view action
            console.log('View clicked for:', imageUrl);
          }
        },
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            // Handle delete action
            console.log('Delete clicked for:', imageUrl);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // Handle cancel action
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
      backdropDismiss: true // This enables clicking outside the modal to dismiss it
    });
    return await modal.present();
  }

  async dismissModal() {
    this.viewImageUrl = null;
    await this.modalController.dismiss();
  }
}
