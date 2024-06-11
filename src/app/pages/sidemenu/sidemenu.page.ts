import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.page.html',
  styleUrls: ['./sidemenu.page.scss'],
})
export class SidemenuPage implements OnInit {

  constructor(private menuCtrl: MenuController) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  toggleMenu() {
    this.menuCtrl.toggle('another-menu');
  }
}