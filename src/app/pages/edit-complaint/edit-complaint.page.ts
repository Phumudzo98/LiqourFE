import { HttpClient } from '@angular/common/http';
import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { headersSecure } from 'src/app/util/service/const';

@Component({
  selector: 'app-edit-complaint',
  templateUrl: './edit-complaint.page.html',
  styleUrls: ['./edit-complaint.page.scss'],
})
export class EditComplaintPage implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private aRoute: Router, private eRef: ElementRef) {}

  reference: string = "ECLB001520";
  description: string = "Caller complained that the person is selling alcohol to the public without a liquor license.";
  strAddress: string = "559 N.U. 1";

  offOutlet: string = "";
  districMunicipalty: string = "Mdantsane";
  localMunicipality: string = "ECLB000000000";
  town: string = "East London";
  comment: string = "";
  history: string = "";
 
  referenceNo:any;
  collectObj:any;

  ngOnInit() {

    this.route.paramMap.subscribe(param => {

      this.referenceNo = param.get('referenceNumber');

      let url = "https://system.eclb.co.za/eclb2/api/general/get-complain/"+this.referenceNo;

      let token = localStorage.getItem("userToken") 
    const newHeader={
      "Authorization":"Bearer "+token, 
      "Accept":"*/*"
    }
      
      this.http.get<any>(url,{headers: newHeader}).subscribe(response => {
        console.log(response)
        
        //this.collectObj=response;
        
        this.reference=response.referenceNumber;
        //this.description=response.;
        this.strAddress=response.address;
        this.offOutlet=response.offendingOutlet;
        this.town=response.town;
        this.districMunicipalty=response.districtName
        this.localMunicipality=response.localMunicipality
        this.comment=response.comment;
        this.history=response.commentHistory;


      }, error => {
        console.log(error)
      });
    });
  }
  navigateToBack() {
    this.aRoute.navigate(['complaints']);
  }
}
