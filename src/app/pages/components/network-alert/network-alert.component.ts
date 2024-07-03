import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { NetworkService } from 'src/app/util/service/network.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-network-alert',
  template: `
    <div *ngIf="!isOnline && alertVisible" class="network-alert">
      <div class="card">
        <div class="card-header">
          Connect to a Network
        </div>
        <div class="card-content">
          To use the app, turn on mobile data or connect to Wi-Fi.
        </div>
        <div class="card-actions">
          <button (click)="dismissAlert()">OK</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .network-alert {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      height: 100vh;
    }
    .card {
      background-color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 80%;
      text-align: center;
    }
    .card-header {
      font-size: 1.5em;
      margin-bottom: 10px;
    }
    .card-content {
      margin-bottom: 20px;
    }
    .card-actions {
      display: flex;
      justify-content: center;
    }
    .card-actions button {
      padding: 10px 20px;
      font-size: 1em;
      border: none;
      border-radius: 5px;
      background-color: #822B23;
      color: white;
      cursor: pointer;
      padding-left: 41%;
      padding-right: 41%;
      width: 98%;
    }
    .card-actions button:hover {
      background-color: #822B35;
    }
  `]
})
export class NetworkAlertComponent implements OnInit, OnDestroy {
  isOnline: boolean = true;
  alertVisible: boolean = true;
  private networkStatusSubscription: Subscription = new Subscription();
  private routerSubscription: Subscription = new Subscription();

  constructor(
    private platform: Platform,
    private networkService: NetworkService,
    private router: Router
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateAlertVisibility(event.url);
      }
    });

    this.networkStatusSubscription = this.networkService.isOnline$.subscribe(status => {
      this.isOnline = status;
      this.updateAlertVisibility(this.router.url);
    });
  }

  ngOnDestroy() {
    if (this.networkStatusSubscription) {
      this.networkStatusSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  dismissAlert() {
    this.alertVisible = false;
    setTimeout(() => {
      if (!navigator.onLine) {
        this.alertVisible = true;
      }
    }, 400); // 0.4 second delay before rechecking network status
  }

  private updateAlertVisibility(url: string) {
    // Keep the alert visible based on the network status and the current URL
    const isExcludedRoute = url.includes('/inspection') ||
                            url.includes('/dashboard') ||
                            /^\/complete-inspection\/\d+$/.test(url);
    this.alertVisible = !this.isOnline && !isExcludedRoute;
  }
}
