import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode'; // Import jwt-decode correctly
import { HelperService } from 'src/app/util/service/helper.service';

@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.page.html',
  styleUrls: ['./menu-header.page.scss'],
})
export class MenuHeaderPage implements OnInit {
  isDashboard: boolean = false;
  username: string = '';

  constructor(private router: Router, private helper: HelperService) { }

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.isDashboard = this.router.url === '/dashboard';

      if (this.isDashboard) {
        this.loadUsername();
      }
    });
  }

  loadUsername() {
    let token = localStorage.getItem("userToken");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
       
        this.username = decodedToken.sub.replace(/\./g, ' ');
        console.log(this.username);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }

  toDashboard() {
    this.router.navigate(['dashboard']);
  }
}
