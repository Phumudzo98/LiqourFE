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

  dropdownVisible: { [user: string]: boolean } = {};
  collect: any[] = [];

  constructor(private route: Router, private eRef: ElementRef, private http:HttpClient) {}

  ngOnInit() {
    

      let url="/api/general/get-complaints"

      this.http.get<any>(url,{headers: headersSecure}).subscribe(response=>{
        console.log(response);
        this.collect=response;
      },
    error=>
    {
      console.log(error);
      
    })

  }

  toggleDropdown(event: Event, user: string) {
    event.stopPropagation();
    this.dropdownVisible[user] = !this.dropdownVisible[user];
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
    Object.keys(this.dropdownVisible).forEach(user => {
      if (this.dropdownVisible[user] && !this.eRef.nativeElement.querySelector('.label').contains(event.target)) {
        this.dropdownVisible[user] = false;
      }
    });
  }
}
