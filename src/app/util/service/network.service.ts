import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, map } from 'rxjs';

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