import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.page.html',
  styleUrls: ['./complaints.page.scss'],
})
export class ComplaintsPage implements OnInit {

  dropdownVisible: { [user: string]: boolean } = {};
  users: string[] = ['Xolisa sibeko1', 'Vuyo Mfula', 'Andrew king', 'Mkangeli Mtimkulu', 'Eric Mata'];
  userComplaints: { [user: string]: string[] } = {};
 

  constructor(private route: Router, private eRef: ElementRef) {}

  ngOnInit() {
    this.users.forEach(user => {
      this.dropdownVisible[user] = false;
      this.userComplaints[user] = [
        'Residential home is used a shebeen and the patrons are misbehaving and disturbing the peace of the community with loud music played.',
      ];
    });
  }

  toggleDropdown(event: Event, user: string) {
    event.stopPropagation();
    this.dropdownVisible[user] = !this.dropdownVisible[user];
  }

  navigateToView() {
    this.route.navigate(['view-complaint']);
  }

  navigateToEdit() {
    this.route.navigate(['edit-complaint']);
  }

 



  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    Object.keys(this.dropdownVisible).forEach(user => {
      if (this.dropdownVisible[user] && !this.eRef.nativeElement.querySelector('.label').contains(event.target)) {
        this.dropdownVisible[user] = false;
      }
    });
  }
}
