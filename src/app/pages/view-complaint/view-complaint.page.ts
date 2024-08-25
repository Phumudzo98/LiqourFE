import { HttpClient } from '@angular/common/http';
import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { headersSecure } from 'src/app/util/service/const';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.page.html',
  styleUrls: ['./view-complaint.page.scss'],
})
export class ViewComplaintPage implements OnInit {

  constructor(private aRoute: Router, private eRef: ElementRef, private http:HttpClient, private route: ActivatedRoute) {}

  referenceNo:any;

  collect:any[]=[];

  collectObj:any

  ngOnInit() {
    this.route.paramMap.subscribe(param => {

      let token = localStorage.getItem("userToken") 
    const newHeader={
      "Authorization":"Bearer "+token, 
      "Accept":"*/*"
    }

      this.referenceNo = param.get('referenceNumber');

      let url = environment.eclbDomain+"api/general/get-complaint-details/"+this.referenceNo;
      
      this.http.get<any>(url,{headers: newHeader}).subscribe(response => {
        console.log(response)
        this.collect=response;

        this.collectObj=response;
      }, error => {
        console.log(error)
      });
    });


  }

  navigateToBack() {
    this.aRoute.navigate(['complaints']);
  }

}
