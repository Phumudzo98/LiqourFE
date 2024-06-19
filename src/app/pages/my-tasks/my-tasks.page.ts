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
  collect: any[] = [];
  loading: boolean = true; // Add loading state

  constructor(private route: Router, private http: HttpClient) { }

  ngOnInit() {
    let url = "/api/general/get-inbox";

    this.http.get<any[]>(url, { headers: headersSecure }).subscribe(
      response => {
        console.log(response);
        this.collect = response;
        this.loading = false; // Hide loader after data is loaded
      },
      error => {
        console.log(error);
        this.loading = false; // Hide loader if there's an error
      }
    );
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }
}
