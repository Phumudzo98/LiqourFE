import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { headersSecure } from 'src/app/util/service/const';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss'],
})
export class MyTasksPage implements OnInit {

  constructor(private route:Router, private http:HttpClient) { }

  collect:any[]=[]

  ngOnInit() {
    let url="/api/general/get-inbox"

    this.http.get<any[]>(url,{headers:headersSecure}).subscribe(response=>
      {
        console.log(response);
        this.collect=response;
      }
      ,error=>
        {
          console.log(error);
          
        }
    )
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }

}
