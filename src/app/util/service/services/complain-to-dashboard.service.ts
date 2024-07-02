import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ComplaintsPage } from 'src/app/pages/complaints/complaints.page';

@Injectable({
  providedIn: 'root'
})
export class ComplainToDashboardService {

  private navigateToDashboardSubject = new Subject<void>();

  navigateToDashboard$ = this.navigateToDashboardSubject.asObservable();

  triggerNavigateToDashboard() {
    this.navigateToDashboardSubject.next();
  }
}
