import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.page.html',
  styleUrls: ['./menu-footer.page.scss'],
})
export class MenuFooterPage  {

  constructor(private menu: MenuController,private renderer: Renderer2,private router: Router) {}

  toggleMenu(menuId: string) {
    this.menu.toggle(menuId);
    this.menu.open(menuId);
  }


  ngOnInit() {
  }
  navigateToDashboard() {
    this.router.navigate(['dashboard']);
  }

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
}

