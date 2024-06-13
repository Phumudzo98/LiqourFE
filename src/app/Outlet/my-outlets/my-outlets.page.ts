import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-outlets',
  templateUrl: './my-outlets.page.html',
  styleUrls: ['./my-outlets.page.scss'],
})
export class MyOutletsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  outlets = [
    {
      imgSrc: '../../../assets/Images/PicsArt_05-14-05.58 2.svg',
      header: 'Kwa Coca Tavern',
      details: 'ECP08498/03017/OO <br>On & Off Consumption',
      iconSrc: '../../../assets/Images/Group 88.svg',
    },
    {
      imgSrc: '../../../assets/Images/PicsArt_05-14-05.58 2.svg',
      header: 'POLLAS TAVERN',
      details: 'ECP08500/03020/OO <br>On & Off Consumption',
      iconSrc: '../../../assets/Images/Group 88.svg',
    },
 

    {
      imgSrc: '../../../assets/Images/PicsArt_05-14-05.58 2.svg',
      header: 'VIVAS TAVERN',
      details: 'ECP08507/90454/OO <br>On & Off Consumption',
      iconSrc: '../../../assets/Images/Group 88.svg',
    },
    {
      imgSrc: '../../../assets/Images/PicsArt_05-14-05.58 2.svg',
      header: 'SAKHIS TAVERN',
      details: 'ECP08517/03033/OO <br>On & Off Consumption',
      iconSrc: '../../../assets/Images/Group 88.svg',
    },
   
    {
      imgSrc: '../../../assets/Images/PicsArt_05-14-05.58 2.svg',
      header: 'THE BURGER INN',
      details: 'ECP00852/90454/ON <br>On Consumption',
      iconSrc: '../../../assets/Images/Group 88.svg',
    },
    
  ];

}
