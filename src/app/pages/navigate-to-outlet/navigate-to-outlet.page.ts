import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headers, headersSecure } from 'src/app/util/service/const';

@Component({
  selector: 'app-navigate-to-outlet',
  templateUrl: './navigate-to-outlet.page.html',
  styleUrls: ['./navigate-to-outlet.page.scss'],
})
export class NavigateToOutletPage implements OnInit {

  constructor(private route: Router, private http: HttpClient) { }

  outlets: any[] = [];
  specific: any = '';
  loading: boolean = true; // Add loading state

  ngOnInit() {
    let url = "/api/outlet"
    this.http.get<any[]>(url + "/get-outlets", { headers: headersSecure }).subscribe(response => {
        const large = response;
        this.specific = large;

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

        this.loading = false; // Hide spinner after data is loaded
      },
      error => {
        console.log(error);
        this.loading = false; // Hide spinner if there's an error
      }
    );
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }
}
