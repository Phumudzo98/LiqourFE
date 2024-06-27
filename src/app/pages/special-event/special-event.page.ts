import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-special-event',
  templateUrl: './special-event.page.html',
  styleUrls: ['./special-event.page.scss'],
})
export class SpecialEventPage implements OnInit {
  loading: boolean = true;
  outlets: any[] = [];

  constructor(private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadOutlets();
  }

  loadOutlets() {
    this.spinner.show();
    setTimeout(() => {
      // Simulate a delay for loading data
      this.outlets = [
        {
          imgSrc: '../../../assets/Images/kwa coca.jpeg',
          header: 'Kwa Coca Tavern',
          details: 'ECP08498/03017/OO <br>On & Off Consumption',
          iconSrc: '../../../assets/Images/Group 88.svg',
        },
        {
          imgSrc: '../../../assets/Images/pllas.jpeg',
          header: 'POLLAS TAVERN',
          details: 'ECP08500/03020/OO <br>On & Off Consumption',
          iconSrc: '../../../assets/Images/Group 88.svg',
        },
        {
          imgSrc: '../../../assets/Images/viva.jpeg',
          header: 'VIVAS TAVERN',
          details: 'ECP08507/90454/OO <br>On & Off Consumption',
          iconSrc: '../../../assets/Images/Group 88.svg',
        },
        {
          imgSrc: '../../../assets/Images/shakis.jpeg',
          header: 'SAKHIS TAVERN',
          details: 'ECP08517/03033/OO <br>On & Off Consumption',
          iconSrc: '../../../assets/Images/Group 88.svg',
        },
        {
          imgSrc: '../../../assets/Images/burguer nn.jpeg',
          header: 'THE BURGER INN',
          details: 'ECP00852/90454/ON <br>On Consumption',
          iconSrc: '../../../assets/Images/Group 88.svg',
        },
      ];
    
      this.spinner.hide();
    }, 2000); // Replace this with your actual data loading logic
  }

  navigateToBack() {
  
      this.router.navigate(['dashboard']);
  }
}
