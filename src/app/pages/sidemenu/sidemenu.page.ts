<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, Renderer2 } from '@angular/core';
>>>>>>> a330abaeaa6ef78624fafbaa761455d7765afcef
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

<<<<<<< HEAD
  constructor(private router: Router) { }
=======
  constructor(private renderer: Renderer2,private router: Router) {}
>>>>>>> a330abaeaa6ef78624fafbaa761455d7765afcef

  ngOnInit() {
  }
  navigateToDashboard() {
    this.router.navigate(['dashboard']);
  }

<<<<<<< HEAD
  navigateToDashboard(){
    this.router.navigate(['dashboard']);
  }

=======
  addHoverEffect(id: string) {
    const activeItem = document.querySelector('.active-item');
    if (activeItem) {
      activeItem.classList.remove('active-item');
    }

    const item = document.getElementById(id);
    if (item) {
      item.classList.add('active-item');
    }

    this.router.navigateByUrl('/' + id); // Navigate to the clicked route
  }
  
  activeItem: string = '';

 
  setActiveItem(item: string) {
    this.activeItem = item;
    console.log('Active Item:', this.activeItem);
  }

  menuType: string = 'overlay';
>>>>>>> a330abaeaa6ef78624fafbaa761455d7765afcef
}
