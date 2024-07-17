import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent} from 'rxjs';
import { map } from 'rxjs/operators'; // Import map from rxjs/operators
@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private isOnline = new BehaviorSubject<boolean>(navigator.onLine);
  isOnline$ = this.isOnline.asObservable();

  constructor() {
    window.addEventListener('online', () => this.updateNetworkStatus());
    window.addEventListener('offline', () => this.updateNetworkStatus());
  }

  private updateNetworkStatus() {
    this.isOnline.next(navigator.onLine);
  }
}