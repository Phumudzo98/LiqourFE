import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-complaint',
  templateUrl: './edit-complaint.page.html',
  styleUrls: ['./edit-complaint.page.scss'],
})
export class EditComplaintPage implements OnInit {

  constructor(private route: Router, private eRef: ElementRef) {}

  ngOnInit() {
  }
  navigateToBack() {
    this.route.navigate(['complaints']);
  }
}
