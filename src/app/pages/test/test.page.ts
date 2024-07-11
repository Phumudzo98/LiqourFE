import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

  selectedFileName: string = '';

  constructor() { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  selectFile(): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Adjust as needed for file types
    fileInput.onchange = (event: Event) => this.onFileSelected(event);
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const file: File | null = (inputElement.files as FileList)[0];
    if (file) {
      this.selectedFileName = file.name;
      // Perform any additional actions with the selected file
      console.log(file);
    }
  }
}