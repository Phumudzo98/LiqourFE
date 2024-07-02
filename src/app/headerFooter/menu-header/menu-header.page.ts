import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is correctly imported
import { HelperService } from 'src/app/util/service/helper.service';
import { CommunicationService } from 'src/app/util/service/shared/communication.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.page.html',
  styleUrls: ['./menu-header.page.scss'],
})
export class MenuHeaderPage implements OnInit {
  username: string = '';
  isDashboard: boolean = false;

  constructor(
    private router: Router,
    private helper: HelperService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit() {
    // Subscribe to router events to track navigation changes
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.loadUsername(); // Load username on every navigation end
        this.isDashboard = this.router.url === '/dashboard'; // Check if current route is dashboard
      }
    });
  }

  loadUsername() {
    let token = localStorage.getItem('userToken');
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
    if (this.router.url === '/complaints') {
      this.communicationService.triggerNavigateToDashboard();
      
    } else {
      this.router.navigate(['/dashboard']); // Navigate to dashboard route
    }
  }
}

 

