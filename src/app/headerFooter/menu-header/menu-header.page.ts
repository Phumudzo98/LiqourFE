import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is 
import { HelperService } from 'src/app/util/service/helper.service';
import { CommunicationService } from 'src/app/util/service/shared/communication.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.page.html',
  styleUrls: ['./menu-header.page.scss'],
})
export class MenuHeaderPage implements OnInit {
  usernameWithSpaces: string = '';
  usernameWithDots: string = '';
  isDashboard: boolean = false;
  profileImage: any;

  constructor(
    private router: Router,
    private helper: HelperService,
    private communicationService: CommunicationService,
    private http: HttpClient
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
        const originalUsername = decodedToken.sub;

        this.usernameWithSpaces = originalUsername.replace(/\./g, ' ');
        this.usernameWithDots = originalUsername.replace(/ /g, '.');
        //this.fetchProfilePictureByEmail(); // Call the method correctly
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

 /* fetchProfilePictureByEmail() {
    this.http.get(`http://localhost:8081/api/user/profile-image/${this.usernameWithDots}`, {
      responseType: 'blob'
    }).subscribe(
      (response: Blob) => {
        console.log(this.usernameWithDots);
        const reader = new FileReader();
        reader.onloadend = () => {
          this.profileImage = reader.result; // Store the image data in the profileImage property
        };
        reader.readAsDataURL(response);
      },
      error => {
        console.error('Error fetching profile image:', error);
      }
    );
  }*/

  toDashboard() {
    if (this.router.url === '/complaints') {
      this.communicationService.triggerNavigateToDashboard();
    } else {
      this.router.navigate(['/dashboard']); // Navigate to dashboard route
    }
  }
}
