import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-documents',
  templateUrl: './view-documents.page.html',
  styleUrls: ['./view-documents.page.scss'],
})
export class ViewDocumentsPage implements OnInit {

  constructor(private alertController: AlertController) { }
  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.initializeDeleteButton();
  }

  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this document?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Document deleted');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Deletion cancelled');
          }
        } 
      ]
    });

    await alert.present();
  }

  initializeDeleteButton(): void {
    const buttonDelete = document.getElementById('buttonDelete') as HTMLImageElement;

    if (buttonDelete) {
      buttonDelete.addEventListener('click', () => {
        this.presentAlert();
      });
    }
  }

}
