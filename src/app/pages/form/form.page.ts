import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  constructor() { }


  myForm:FormGroup= new FormGroup({});



  ngOnInit() {

    this.myForm=new FormGroup(
      {
        contactPerson: new FormControl('', [Validators.required]),
        inspectionDate: new FormControl('', [Validators.required]),
        latitude: new FormControl('', [Validators.required]),
        longitude: new FormControl('', [Validators.required]),

        appointmentSet: new FormControl('', [Validators.required]),
        consultedOrFound: new FormControl('', [Validators.required]),
        applicantIndicatedPersonAtPremises: new FormControl('', [Validators.required]),
        canPersonBeFound: new FormControl('', [Validators.required]),
        interestInLiquorTrade:new FormControl('', [Validators.required]),
        issuedComplience:new FormControl('', [Validators.required]),
        complaintsReceived: new FormControl('', [Validators.required]),

        rightToOccupy: new FormControl('', [Validators.required]),
        leaseAttached: new FormControl('', [Validators.required]),
        situatedInRightAddress: new FormControl('', [Validators.required]),
        inLineWithSubmittedApplication: new FormControl('', [Validators.required]),
        premisesSuitable: new FormControl('', [Validators.required]),
        ablutionFacilityInOrder: new FormControl('', [Validators.required]),
        readyForBusiness: new FormControl('', [Validators.required]),

        formServedToCorrectWardCommittee: new FormControl('', [Validators.required]),
        confirmedByCouncillor: new FormControl('', [Validators.required]),
        wardCommiteeReport: new FormControl('', [Validators.required]),
        communityConsultation: new FormControl('', [Validators.required]),
        educationalInstitution: new FormControl('', [Validators.required]),
        formServedAtEducationInstitution: new FormControl('', [Validators.required]),
        placeOfWorship: new FormControl('', [Validators.required]),
        formServedAtPlaceOfWorship: new FormControl('', [Validators.required]),

        recommendation: new FormControl('', [Validators.required]),
        futureInspectionDate: new FormControl('', [Validators.required]),
        comments: new FormControl('', [Validators.required]),
        
      }
    )
  }

}
