import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-inspection',
  templateUrl: './complete-inspection.page.html',
  styleUrls: ['./complete-inspection.page.scss'],
})
export class CompleteInspectionPage implements OnInit {

  selectedOption: string = ''; 
  constructor(private route: Router, private eRef: ElementRef,) {}

  ngOnInit() {
  }

  currentForm: string = 'landing';

  toggleForms(form: string) {
    this.currentForm = form;
  }
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    // Handle the file selection logic here
  }
  navigateToBack() {
    this.route.navigate(['complete-inspection']);
  }

}
