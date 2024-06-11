import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-view-outlet',
  templateUrl: './view-outlet.page.html',
  styleUrls: ['./view-outlet.page.scss'],
})
export class ViewOutletPage implements OnInit {

  constructor(private menu: MenuController) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toggleMenu(menuId: string) {
    this.menu.toggle(menuId);
  }
}
