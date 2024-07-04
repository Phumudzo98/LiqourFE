import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription, interval } from 'rxjs';
import { NetworkService } from 'src/app/util/service/network.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-network-alert',
  template: `
    <div *ngIf="!isOnline && alertVisible" class="network-alert-overlay">
      <div class="network-alert">
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
    </div>
  `,
  styles: [`
    .network-alert-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
      pointer-events: none;
    }
    .network-alert {
      pointer-events: all;
      display: flex;
      justify-content: center;
      align-items: center;
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
  private dismissedRoutes: Set<string> = new Set<string>(); // Track dismissed routes

  constructor(
    private platform: Platform,
    private networkService: NetworkService,
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to router events to update alert visibility on navigation
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateAlertVisibility(event.url);
      }
    });

    // Check network status periodically
    this.networkStatusSubscription = interval(400).subscribe(() => {
      this.checkNetworkStatus();
    });
  }

  ngOnDestroy() {
    // Unsubscribe from subscriptions to avoid memory leaks
    if (this.networkStatusSubscription) {
      this.networkStatusSubscription.unsubscribe();
    }
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  dismissAlert() {
    // Dismiss alert for the current route
    const currentUrl = this.router.url;
    if (this.isExcludedRoute(currentUrl)) {
      if (currentUrl.includes('/inspection') || /^\/complete-inspection\/\d+$/.test(currentUrl)) {
        this.dismissedRoutes.add(currentUrl); // Permanent dismissal for /inspection and /complete-inspection/{caseNumber} routes
      }
      this.alertVisible = false;
    } else {
      this.alertVisible = false;
    }
  }
  

  private updateAlertVisibility(url: string) {
    // Update alert visibility based on network status and dismissed routes
    if (this.dismissedRoutes.has(url)) {
      this.alertVisible = false; // Hide alert if route is dismissed
    } else {
      this.alertVisible = !this.isOnline; // Show alert if network is offline
    }
  }

  private checkNetworkStatus() {
    // Check network status and update alert visibility
    this.isOnline = navigator.onLine;
    this.updateAlertVisibility(this.router.url);
  }

  private isExcludedRoute(url: string): boolean {
    return url.includes('/inspection') ||
           /^\/complete-inspection\/\d+$/.test(url);
  }
}
