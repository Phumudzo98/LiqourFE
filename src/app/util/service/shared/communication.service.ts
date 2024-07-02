import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private navigateToDashboardSubject = new Subject<void>();

  navigateToDashboard$ = this.navigateToDashboardSubject.asObservable();

  triggerNavigateToDashboard() {
    this.navigateToDashboardSubject.next();
  }
}