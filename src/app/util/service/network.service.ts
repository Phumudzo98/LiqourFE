import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private onlineStatus = new BehaviorSubject<boolean>(navigator.onLine);
  isOnline$ = this.onlineStatus.asObservable();

  constructor() {
    fromEvent(window, 'online').pipe(map(() => true)).subscribe(this.onlineStatus);
    fromEvent(window, 'offline').pipe(map(() => false)).subscribe(this.onlineStatus);
  }
}