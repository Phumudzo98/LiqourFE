// complaints.page.ts
import { Component, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { CommunicationService } from 'src/app/util/service/shared/communication.service';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit, OnDestroy {

  dropdownVisible: { [key: string]: boolean } = {};
  collect: any[] = [];
  filteredCollect: any[] = [];
  searchTerm: string = '';
  loading: boolean = true; // Loading flag
  private subscription: Subscription;

  constructor(
    private route: Router,
    private eRef: ElementRef,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private communicationService: CommunicationService // Fixed injection
  ) {
    this.subscription = this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/complaints') {
        this.fetchComplaints();
      }
    });
  }

  ngOnInit() {
    this.fetchComplaints();
    this.communicationService.navigateToDashboard$.subscribe(() => {
      this.navigateToBack();
    });
  }

  fetchComplaints() {
    this.spinner.show();
    const url = "https://system.eclb.co.za/eclb2/api/general/get-complaints";
    const token = localStorage.getItem("userToken");
    const newHeader = {
      "Authorization": "Bearer " + token,
      "Accept": "*/*"
    };

    this.http.get<any>(url, { headers: newHeader }).subscribe(
      response => {
        console.log(response);
        this.collect = response;
        this.filteredCollect = response;
      
          this.filteredCollect.sort((a, b) => new Date(b.dateComplaintLogged).getTime() - new Date(a.dateComplaintLogged).getTime());
          this.filteredCollect = this.filteredCollect || []
        this.spinner.hide();
        this.loading = false;
      },
      error => {
        console.log(error);
        this.spinner.hide();
        this.loading = false;
      }
    );
  }

  toggleDropdown(event: Event, referenceNumber: string) {
    event.stopPropagation();
    this.dropdownVisible = {};  // Reset all dropdowns
    this.dropdownVisible[referenceNumber] = !this.dropdownVisible[referenceNumber]; // Toggle only the clicked dropdown
  }

  navigateToView() {
    this.route.navigate(['view-complaint']);
  }

  navigateToBack() {
    this.resetPage(); // Clear the page data in the background

    setTimeout(() => {
      this.route.navigate(['dashboard']); // Navigate to dashboard after a delay
    }, 0); // Delay of 0 milliseconds (0 second)
  }

  navigateToEdit() {
    this.route.navigate(['edit-complaint']);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    Object.keys(this.dropdownVisible).forEach(referenceNumber => {
      if (this.dropdownVisible[referenceNumber] && !this.eRef.nativeElement.querySelector('.header-content').contains(event.target)) {
        this.dropdownVisible[referenceNumber] = false;
      }
    });
  }

  // Searching for a Complaint
  filterComplaints() {
    const term = this.searchTerm.toLowerCase();
    this.filteredCollect = this.collect.filter(complaint =>
      complaint.outletName.toLowerCase().startsWith(term)
    );
  }

  resetPage() {
    this.collect = [];
    this.filteredCollect = [];
    this.searchTerm = '';
    this.loading = true;
  }

  ngOnDestroy() {
    this.resetPage(); // Clear the page data when the component is destroyed
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
