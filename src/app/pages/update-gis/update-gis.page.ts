import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headersSecure } from 'src/app/util/service/const';

@Component({
  selector: 'app-update-gis',
  templateUrl: './update-gis.page.html',
  styleUrls: ['./update-gis.page.scss'],
})
export class UpdateGisPage implements OnInit {

  searchTerm: string = '';
  outlets: any[] = [];
  filteredOutlets: any[] = [];

  constructor(private route: Router, private http: HttpClient) { }

  url:string="https://system.eclb.co.za/eclb2//api/general/save-gis"

  ngOnInit() {
    
    this.filteredOutlets = this.outlets;
    this.http.get(this.url,{headers:headersSecure}).subscribe(response=>
      {
        console.log(response);
        
      },error=>
        {
          console.log(error);
          
        }

    )
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
