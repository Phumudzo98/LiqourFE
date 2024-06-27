import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.page.html',
  styleUrls: ['./inspections.page.scss'],
})
export class InspectionsPage implements OnInit {
  collect: any[] = [];
  filteredOutlets: any[] = [];
  searchTerm: string = '';

  constructor(private route: Router, private http: HttpClient,private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    const token = localStorage.getItem("userToken");
    const newHeader = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Accept": "*/*"
    });

    const url = "https://system.eclb.co.za/eclb2/api/general/get-inbox";

    this.http.get<any[]>(url, { headers: newHeader }).subscribe(
      response => {
        console.log(response);
        this.collect = response;
        this.filteredOutlets = this.collect; // Initialize filteredOutlets
        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }

  filterOutlets() {
    this.filteredOutlets = this.collect.filter(outlet =>
      outlet.outletName.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
  }
}
