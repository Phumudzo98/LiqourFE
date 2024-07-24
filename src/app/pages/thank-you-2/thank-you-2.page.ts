import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-thank-you-2',
  templateUrl: './thank-you-2.page.html',
  styleUrls: ['./thank-you-2.page.scss'],
})
export class ThankYou2Page implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {

    setTimeout(() => {
      this.router.navigate(['/special-event']);
    }, 5000);
  }

}
