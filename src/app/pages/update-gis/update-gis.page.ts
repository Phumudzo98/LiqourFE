import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner'; // Import NgxSpinnerService

@Component({
  selector: 'app-update-gis',
  templateUrl: './update-gis.page.html',
  styleUrls: ['./update-gis.page.scss'],
})
export class UpdateGisPage implements OnInit {

  searchTerm: string = '';
  outlets: any[] = [];
  filteredOutlets: any[] = [];

  constructor(private route: Router, private spinner: NgxSpinnerService) { } // Inject NgxSpinnerService

  ngOnInit() {
    this.fetchData(); // Call fetchData on component initialization
  }

  fetchData() {
    this.spinner.show(); // Show spinner before data fetching

    // Simulating asynchronous data fetching (replace with actual HTTP request)
    setTimeout(() => {
      this.outlets = [
        {
          imgSrc: '../../../assets/Images/kwa coca.jpeg',
          header: 'Kwa Coca Tavern',
          details: 'ECP08498/03017/OO <br>On & Off Consumption',
          iconSrc: '../../../assets/Images/Group 88.svg',
        },
        {
          imgSrc: '../../../assets/Images/pllas.jpeg',
          header: 'POLLAS TAVERN',
          details: 'ECP08500/03020/OO <br>On & Off Consumption',
          iconSrc: '../../../assets/Images/Group 88.svg',
        },
        {
          imgSrc: '../../../assets/Images/viva.jpeg',
          header: 'VIVAS TAVERN',
          details: 'ECP08507/90454/OO <br>On & Off Consumption',
          iconSrc: '../../../assets/Images/Group 88.svg',
        },
        {
          imgSrc: '../../../assets/Images/shakis.jpeg',
          header: 'SAKHIS TAVERN',
          details: 'ECP08517/03033/OO <br>On & Off Consumption',
          iconSrc: '../../../assets/Images/Group 88.svg',
        },
        {
          imgSrc: '../../../assets/Images/burguer nn.jpeg',
          header: 'THE BURGER INN',
          details: 'ECP00852/90454/ON <br>On Consumption',
          iconSrc: '../../../assets/Images/Group 88.svg',
        },
      ];

      this.filteredOutlets = this.outlets; // Assign data to filteredOutlets
      this.spinner.hide(); // Hide spinner after data fetch
    }, 2000); // Simulate 2 seconds delay (replace with actual data fetch logic)
  }

  filterOutlets() {
    const term = this.searchTerm.toLowerCase();
    this.filteredOutlets = this.outlets.filter(outlet => 
      outlet.header.toLowerCase().startsWith(term)
    );
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }
}
