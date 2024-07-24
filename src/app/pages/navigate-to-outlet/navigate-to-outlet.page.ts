import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { headers, headersSecure } from 'src/app/util/service/const';

@Component({
  selector: 'app-navigate-to-outlet',
  templateUrl: './navigate-to-outlet.page.html',
  styleUrls: ['./navigate-to-outlet.page.scss'],
})
export class NavigateToOutletPage implements OnInit {
  outlets: any[] = [];
  specific: any = '';
  loading: boolean = true; // Add loading state
  searchQuery: string = ''; // Add search query property

  constructor(private route: Router, private http: HttpClient,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    let url = "/api/outlet"
    this.http.get<any[]>("https://system.eclb.co.za/eclb2/api/outlet/get-outlets", { headers: headersSecure }).subscribe(response => {
        const large = response;
        this.specific = large;

        console.log(large);
        

        this.outlets = [
          {
            imgSrc: '../../../assets/Images/kwa coca.jpeg',
            header: this.specific[5].organisationName,
            details: this.specific[5].ecpNumber + " " + this.specific[5].licenseCategory,
            iconSrc: '../../../assets/Images/Group 88.svg',
          },
          {
            imgSrc: '../../../assets/Images/pllas.jpeg',
            header: this.specific[6].organisationName,
            details: this.specific[6].ecpNumber + " " + this.specific[6].licenseCategory,
            iconSrc: '../../../assets/Images/Group 88.svg',
          },
          {
            imgSrc: '../../../assets/Images/viva.jpeg',
            header: this.specific[7].organisationName,
            details: this.specific[7].ecpNumber + " " + this.specific[7].licenseCategory,
            iconSrc: '../../../assets/Images/Group 88.svg',
          },
          {
            imgSrc: '../../../assets/Images/shakis.jpeg',
            header: this.specific[8].organisationName,
            details: this.specific[8].ecpNumber + " " + this.specific[8].licenseCategory,
            iconSrc: '../../../assets/Images/Group 88.svg',
          },
          {
            imgSrc: '../../../assets/Images/burguer nn.jpeg',
            header: this.specific[9].organisationName,
            details: this.specific[9].ecpNumber + " " + this.specific[9].licenseCategory,
            iconSrc: '../../../assets/Images/Group 88.svg',
          },
        ];

        this.spinner.hide();
      },
      error => {
        console.log(error);
        this.spinner.hide();
      }
    );
  }

  filteredOutlets() {
    return this.outlets.filter(outlet =>
      outlet.header.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }
}
