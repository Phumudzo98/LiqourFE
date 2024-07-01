import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'; // Import NgxSpinnerService
import { headersSecure } from 'src/app/util/service/const';


@Component({
  selector: 'app-update-gis',
  templateUrl: './update-gis.page.html',
  styleUrls: ['./update-gis.page.scss'],
})
export class UpdateGisPage implements OnInit {

  searchTerm: string = '';
  
  filteredOutlets: any[] = [];

  outlets:any[]=[];

  

  url:string="https://system.eclb.co.za/eclb2//api/general/save-gis"
  constructor(private route: Router, private spinner: NgxSpinnerService, private http: HttpClient) { }
   // Inject NgxSpinnerService

  url2="https://system.eclb.co.za/eclb2/api/general/get-inbox";


  ngOnInit() {
    this.fetchData(); // Call fetchData on component initialization


    this.http.get(this.url2,{headers: headersSecure}).subscribe( (response: any)=>
      {
        console.log(response);

        this.outlets=response;
        this.filteredOutlets = this.outlets;
        
      },error=>
        {
          console.log(error);
          
        }
    )
  }

  fetchData() {
    this.spinner.show(); // Show spinner before data fetching

    // Simulating asynchronous data fetching (replace with actual HTTP request)
    setTimeout(() => {
      
      this.spinner.hide();
      this.filteredOutlets = this.outlets; // Assign data to filteredOutlets
       // Hide spinner after data fetch
    }, 2000); // Simulate 2 seconds delay (replace with actual data fetch logic)
  }

  filterOutlets() {
    const term = this.searchTerm.toLowerCase();
    this.filteredOutlets = this.outlets.filter((outlet) => 
      outlet.header.toLowerCase().startsWith(term)
    );
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }
}
