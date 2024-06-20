import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControlName, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { headersSecure } from 'src/app/util/service/const';

@Component({
  selector: 'app-complete-inspection',
  templateUrl: './complete-inspection.page.html',
  styleUrls: ['./complete-inspection.page.scss'],
})
export class CompleteInspectionPage implements OnInit {

  selectedOption: string = '';
  uploadedFiles: { name: string, size: number }[] = [];
  currentForm: string = 'landing';

  
 
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;
  generalForm: FormGroup;
  documentationForm:FormGroup;
  communityForm:FormGroup;
  recommendationForm:FormGroup;
  applicantForm: FormGroup;

  caseId:any;

  constructor(private http: HttpClient, private aRoute: Router, private route :ActivatedRoute, private eRef: ElementRef, private alertController: AlertController,private fb: FormBuilder) {
    this.generalForm = this.fb.group({
      personContacted: ['', Validators.required],
      inspectionDate: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });

    this.applicantForm = this.fb.group({
      appointmentSet: ['', Validators.required],
      personConsulted: ['', [Validators.required]],
      indicatedParticularPerson: ['', [Validators.required]],
      personFoundConfirmed: ['', [Validators.required]],
      rightToOccupy: ['', [Validators.required]],
    });

    this.communityForm = this.fb.group({
      formServedToWardCommittee: ['', Validators.required],
      formServedToWardCouncillor: ['', [Validators.required]],
      wardCommitteReport: ['', [Validators.required]],
      communityConsulted: ['', [Validators.required]],
      educationalInstitutionWithin100m: ['', [Validators.required]],
      premisesInIndicatedAddress: ['', [Validators.required]],
      formServedAtEducationalInstitution: ['', [Validators.required]],
      placeOfWorshipWithin100m: ['', [Validators.required]],
      formServedAtPlaceOfWorship: ['', [Validators.required]]

     
    });

    this.recommendationForm = this.fb.group({
      recommendationForRegistration: ['', Validators.required],
  comments: ['', Validators.required],
  futurePreInspectionDate:['', Validators.required],
  lease: ['', Validators.required]
    });

    this.documentationForm = this.fb.group({
      indicatedParticularPerson: ['', [Validators.required]],
  personFoundConfirmed:['', Validators.required],
  rightToOccupy:['', Validators.required],
  premisesInIndicatedAddress:['', Validators.required],
  premiseInLineWithPlan: ['', Validators.required],
  premisesSuitedForCategory: ['', Validators.required],
  abulutionFacilityWorking: ['', Validators.required],
  readyToCommenceWithBusiness: ['', Validators.required]
    })

    /*
    equest body
{
  "currentOutletName": "string",
  "willNameChange": "string",
  "personContacted": "string",
  "inspectionDate": "2024-06-19T13:31:02.037Z",
  "latitude": 0,
  "longitude": 0,
  "appointmentSet": "string",
  "personConsulted": "string",
  "indicatedParticularPerson": "string",
  "personFoundConfirmed": "string",
  "rightToOccupy": "string",
  "premisesInIndicatedAddress": "string",
  "premiseInLineWithPlan": "string",
  "premisesSuitedForCategory": "string",
  "abulutionFacilityWorking": "string",
  "readyToCommenceWithBusiness": "string",
  "formServedToWardCommittee": "string",
  "formServedToWardCouncillor": "string",
  "wardCommitteReport": "string",
  "communityConsulted": "string",
  "educationalInstitutionWithin100m": "string",
  "formServedAtEducationalInstitution": "string",
  "placeOfWorshipWithin100m": "string",
  "formServedAtPlaceOfWorship": "string",
  "recommendationForRegistration": "string",
  "comments": "string",
  "futurePreInspectionDate": "2024-06-19T13:31:02.037Z",
  "lease": "string"
}
    */
  }
  
  ngOnInit() {

    let url="/api/general/get-inspection/"
    this.route.paramMap.subscribe(param => {
      this.caseId = param.get('caseId');

     this.http.get<any>(url+this.caseId,{headers: headersSecure}).subscribe(response=>
      {
        console.log(response);
        
      },error=>{
        console.log(error);
        
      }
     )
     
    });
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
  }
}
