import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss'],
})
export class MyTasksPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }

}
