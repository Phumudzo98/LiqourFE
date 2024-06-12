import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outlet-settings',
  templateUrl: './outlet-settings.page.html',
  styleUrls: ['./outlet-settings.page.scss'],
})
export class OutletSettingsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  currentForm: string = 'landing';

  toggleForms(form: string) {
    this.currentForm = form;
  }

 

}
