import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-gis',
  templateUrl: './update-gis.page.html',
  styleUrls: ['./update-gis.page.scss'],
})
export class UpdateGisPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  outlets = [
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

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }



}
