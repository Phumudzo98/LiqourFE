import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inspections',
  templateUrl: './inspections.page.html',
  styleUrls: ['./inspections.page.scss'],
})
export class InspectionsPage implements OnInit {
  collect: any[] = [];
  filteredOutlets: any[] = [];
  searchTerm: string = '';

  constructor(private route: Router, private http: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.loadData();
  }

  ionViewWillEnter() {
    this.loadData();
  }

  loadData() {
    this.spinner.show();
    const token = localStorage.getItem("userToken");
    const newHeader = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Accept": "*/*",
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache',
      'Expires': '0'
    });

    const url = environment.eclbDomain+"api/general/get-inbox";

    this.http.get<any[]>(url, { headers: newHeader }).subscribe(
      response => {
        this.spinner.hide();
        this.collect = response;
        this.filteredOutlets = this.collect; 

       
        localStorage.setItem('inspectionsData', JSON.stringify(this.collect));
      },
      error => {
        console.log(error);
        this.spinner.hide();

        // Retrieve data from localStorage if available
        const offlineData = localStorage.getItem('inspectionsData');
        if (offlineData) {
          this.collect = JSON.parse(offlineData);
          this.filteredOutlets = this.collect; 
        }
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
