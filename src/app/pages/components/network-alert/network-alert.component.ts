import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval, fromEvent } from 'rxjs';
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
          You are now working offline. turn on mobile data or connect to Wi-Fi.
          </div>
          <div class="card-actions">
            <button (click)="dismissAlert()">OK</button>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="onlineNotificationVisible" class="network-alert-overlay">
    <div class="network-alert">
        <div class="card">
          <div class="card-header">
            Connected Successfully
          </div>
          <div class="card-content">
          You are now working online!
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
    .online-notification {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #4CAF50;
      color: white;
      padding: 10px;
      border-radius: 5px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1001;
      transition: opacity 0.5s ease;
    }
  `]
})
export class NetworkAlertComponent implements OnInit, OnDestroy {
  isOnline: boolean = true;
  alertVisible: boolean = true;
  onlineNotificationVisible: boolean = false;
  private networkStatusSubscription: Subscription = new Subscription();
  private routerSubscription: Subscription = new Subscription();
  private offlineSubscription: Subscription = new Subscription();
  private onlineSubscription: Subscription = new Subscription();
  private alertShown: boolean = false; // Flag to track if the alert has been shown

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    // Subscribe to router events to update alert visibility on navigation
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateAlertVisibility();
      }
    });

    // Check network status periodically (every 1 hour)
    this.networkStatusSubscription = interval(3600000).subscribe(() => {
      this.checkNetworkStatus();
    });

    // Check network status immediately
    this.checkNetworkStatus();

    // Listen to offline events
    this.offlineSubscription = fromEvent(window, 'offline').subscribe(() => {
      this.isOnline = false;
      this.alertVisible = true;
      this.alertShown = false; // Reset flag to show alert again
    });

    // Listen to online events
    this.onlineSubscription = fromEvent(window, 'online').subscribe(() => {
      this.isOnline = true;
      this.alertVisible = false;
      this.showOnlineNotification();
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
    if (this.offlineSubscription) {
      this.offlineSubscription.unsubscribe();
    }
    if (this.onlineSubscription) {
      this.onlineSubscription.unsubscribe();
    }
  }

  dismissAlert() {
    // Dismiss the alert
    this.alertVisible = false;
    this.alertShown = true; // Set flag to indicate alert has been shown
  }

  private updateAlertVisibility() {
    // Update alert visibility based on network status
    if (!this.isOnline && !this.alertShown) {
      this.alertVisible = true;
    } else {
      this.alertVisible = false;
    }
  }

  private checkNetworkStatus() {
    // Check network status and update alert visibility
    this.isOnline = navigator.onLine;
    if (!this.isOnline && !this.alertShown) {
      this.alertVisible = true;
    }
  }

  private showOnlineNotification() {
    // Show online notification
    this.onlineNotificationVisible = true;
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      this.onlineNotificationVisible = false;
    }, 3000); // Notification duration (in milliseconds)
  }
}
