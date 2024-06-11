import { Component, OnInit, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-upload-documents',
  templateUrl: './upload-documents.page.html',
  styleUrls: ['./upload-documents.page.scss'],
})
export class UploadDocumentsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.initializeUploadButton();
  }

  initializeUploadButton(): void {
    const buttonUpload = document.getElementById('buttonUpload') as HTMLImageElement;
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  
    if (buttonUpload && fileInput) {
      buttonUpload.addEventListener('click', (event: MouseEvent): void => {
        fileInput.click();
      });
  
      fileInput.addEventListener('change', (event: Event): void => {
        if (fileInput.files) {
          console.log(fileInput.files); // Logs the selected file(s)
        }
      });
    }
  }
  
  

}
