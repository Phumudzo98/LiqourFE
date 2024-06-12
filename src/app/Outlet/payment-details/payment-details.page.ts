import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.page.html',
  styleUrls: ['./payment-details.page.scss'],
})
export class PaymentDetailsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateBack()
  {
    this.router.navigate(['payments'])
  }

}
