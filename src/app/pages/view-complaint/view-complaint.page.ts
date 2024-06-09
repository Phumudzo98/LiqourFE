import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.page.html',
  styleUrls: ['./view-complaint.page.scss'],
})
export class ViewComplaintPage implements OnInit {

  constructor(private route: Router, private eRef: ElementRef) {}

  ngOnInit() {


  }

  navigateToBack() {
    this.route.navigate(['complaints']);
  }

}
