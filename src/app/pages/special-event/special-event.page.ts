import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.page.html',
  styleUrls: ['./special-event.page.scss'],
})
export class SpecialEventPage implements OnInit {
  loading: boolean = true;
  outlets: any[] = [];
  collect: any[] = [];
  filteredOutlets: any[] = [];
  searchTerm: string = '';
  constructor(private route: Router, private http: HttpClient, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    const token = localStorage.getItem("userToken");
    const newHeader = new HttpHeaders({
      "Authorization": "Bearer " + token,
      "Accept": "*/*"
    });

    const url = environment.eclbDomain+"api/general/get-inbox";

    this.http.get<any[]>(url, { headers: newHeader }).subscribe(
      response => {
        this.spinner.hide();
        console.log(response);
        this.collect = response;
        this.filteredOutlets = this.collect; // Initialize filteredOutlets

        // Store the data in localStorage
        localStorage.setItem('inspectionsData', JSON.stringify(this.collect));
      },
      error => {
        console.log(error);
        this.spinner.hide();

        // Retrieve data from localStorage if available
        const offlineData = localStorage.getItem('inspectionsData');
        if (offlineData) {
          this.collect = JSON.parse(offlineData);
          this.filteredOutlets = this.collect; // Initialize filteredOutlets
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
