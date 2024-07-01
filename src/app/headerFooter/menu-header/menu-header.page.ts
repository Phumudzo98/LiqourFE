import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router'; // Import NavigationEnd for accurate route tracking
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode correctly
import { HelperService } from 'src/app/util/service/helper.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.page.html',
  styleUrls: ['./menu-header.page.scss'],
})
export class MenuHeaderPage implements OnInit {
  username: string = '';
  isDashboard: boolean = false;
  constructor(private router: Router, private helper: HelperService) { }

  ngOnInit() {

    this.router.events.subscribe(() => {
      this.isDashboard = this.router.url === '/dashboard';

    
    });

    // Subscribe to router events to track navigation changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadUsername(); // Call loadUsername() on every navigation end
      }
    });
  }

  loadUsername() {
    let token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        this.username = decodedToken.sub.replace(/\./g, ' ');
        console.log('Username:', this.username);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  toDashboard() {
    this.router.navigate(['dashboard']);
  }
}
