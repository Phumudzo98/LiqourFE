import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-complete-inspection',
  templateUrl: './complete-inspection.page.html',
  styleUrls: ['./complete-inspection.page.scss'],
})
export class CompleteInspectionPage implements OnInit {

  selectedOption: string = ''; 
  constructor(private route: Router, private eRef: ElementRef, private alertController: AlertController) {}
  

  ngOnInit() {
  }
  personContacted: string ="Person Contacted";
  inspectionDate: Date = new Date();
  latitude: string = "Latitude Of Outlet (South)";
  longitude: string = "logitude Of Outlet (South)";



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
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this Document?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Delete');
            this.deleteItem();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, 
      ]
    });

    await alert.present();
  }

  deleteItem() {
    // Your deletion logic here
    console.log('Item deleted');
  }

}
