import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.page.html',
  styleUrls: ['./menu-header.page.scss'],
})
export class MenuHeaderPage implements OnInit {
  isDashboard: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.isDashboard = this.router.url === '/dashboard';
  }

  toDashboard()
  {
    this.router.navigate(['dashboard']);
  }

}

