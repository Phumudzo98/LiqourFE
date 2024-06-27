import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { headers, headersSecure } from 'src/app/util/service/const';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss'],
})
export class MyTasksPage implements OnInit {
  collect: any[] = [];
  loading: boolean = true; // Add loading state

  constructor(private route: Router, private http: HttpClient,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    let url = "/api/general/get-inbox";
    let token = localStorage.getItem("userToken") 
    const newHeader={
      "Authorization":"Bearer "+token, 
      "Accept":"*/*"
    }

    this.http.get<any[]>("https://system.eclb.co.za/eclb2/api/general/get-inbox", { headers: newHeader }).subscribe(
      response => {
        console.log(response);
        this.collect = response;
        
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
}
