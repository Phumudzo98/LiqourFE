import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }


}
