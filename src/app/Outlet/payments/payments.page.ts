import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss'],
})
export class PaymentsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToDetails(){
    this.router.navigate(['payment-details'])
  }


}
