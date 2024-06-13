import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-complaint',
  templateUrl: './edit-complaint.page.html',
  styleUrls: ['./edit-complaint.page.scss'],
})
export class EditComplaintPage implements OnInit {

  constructor(private route: Router, private eRef: ElementRef) {}

  reference: string = "ECLB001520";
  description: string = "Caller complained that the person is selling alcohol to the public without a liquor license.";
  strAddress: string = "559 N.U. 1";

  offOutlet: string = "";
  districMunicipalty: string = "Mdantsane";
  localMunicipality: string = "ECLB000000000";
  town: string = "East London";
  comment: string = "";
  history: string = "";
 

  ngOnInit() {

   
  }
  navigateToBack() {
    this.route.navigate(['complaints']);
  }
}
