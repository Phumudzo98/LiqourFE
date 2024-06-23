import { HttpClient } from '@angular/common/http';
import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { headers, headersSecure } from 'src/app/util/service/const';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {

  dropdownVisible: { [key: string]: boolean } = {};
  collect: any[] = [];
  filteredCollect: any[] = [];
  searchTerm: string = '';

  constructor(private route: Router, private eRef: ElementRef, private http: HttpClient) {}

  ngOnInit() {
    let url = "/api/general/get-complaints";

    this.http.get<any>(url, { headers: headersSecure }).subscribe(response => {
      console.log(response);
      this.collect = response;
      this.filteredCollect = response;
    },
    error => {
      console.log(error);
    });
  }

  toggleDropdown(event: Event, referenceNumber: string) {
    event.stopPropagation();
    this.dropdownVisible = {};  // Reset all dropdowns
    this.dropdownVisible[referenceNumber] = !this.dropdownVisible[referenceNumber]; // Toggle only the clicked dropdown
  }

  navigateToView() {
    this.route.navigate(['view-complaint']);
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }

  navigateToEdit() {
    this.route.navigate(['edit-complaint']);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    Object.keys(this.dropdownVisible).forEach(referenceNumber => {
      if (this.dropdownVisible[referenceNumber] && !this.eRef.nativeElement.querySelector('.header-content').contains(event.target)) {
        this.dropdownVisible[referenceNumber] = false;
      }
    });
  }

  //Searching for a Complaint
  filterComplaints() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCollect = this.collect.filter(complaint => 
      complaint.outletName.toLowerCase().startsWith(term)
    );
  }
}
