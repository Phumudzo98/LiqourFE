import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  navigateToTasks(){
    this.route.navigate(['my-tasks'])
  }

  navigateToUpdate(){
    this.route.navigate(['update-gis'])
  }

  navigateToInspection(){
    this.route.navigate(['inspections'])
  }

  navigateToComplaints(){
    this.route.navigate(['complaints'])
  }
  navigateToNavigate(){
    this.route.navigate(['navigate-to-outlet'])
  }
}
