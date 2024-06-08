import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complete-inspection',
  templateUrl: './complete-inspection.page.html',
  styleUrls: ['./complete-inspection.page.scss'],
})
export class CompleteInspectionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  currentForm: string = 'landing';

  toggleForms(form: string) {
    this.currentForm = form;
  }

}
