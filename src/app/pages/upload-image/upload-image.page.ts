import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {
  imageSources: string[] = []; // Declare the imageSources property as an array of strings
 
  users: string[] = ['Anonymous user 1', 'Anonymous user 2', 'Anonymous user 3'];
  user: boolean[] = [];
  constructor(private actionSheetController: ActionSheetController,private alertController: AlertController,private modalController: ModalController) { }

  ngOnInit() { }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image Source',
      buttons: [
        {
          text: 'Photos',
          icon: 'image',
          handler: () => {
            this.selectImage(CameraSource.Photos);
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.selectImage(CameraSource.Camera);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close'
        }
      ]
    });
    await actionSheet.present();
  }

  async selectImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: source
    });
    if (image.dataUrl) {
      this.imageSources.push(image.dataUrl);
    }
  }
  // In your component class

dropdownVisible: { [index: string]: boolean } = {};
toggleDropdown(event: Event, index: number) {
    event.stopPropagation();
    this.dropdownVisible[index] = !this.dropdownVisible[index];
  }


deleteImage(imageUrl: string) {
  // Find the index of the image in the imageSources array
  const index = this.imageSources.indexOf(imageUrl);
  if (index !== -1) {
    // Remove the image from the imageSources array
    this.imageSources.splice(index, 1);
    // Update the corresponding photoVisibility entry to hide the dropdown
    this.dropdownVisible[index] = false;
  }
}

  
  async showOptions(imageUrl: string) {
    const alert = await this.alertController.create({
      header: 'Options',
      buttons: [
        {
          text: 'View',
          handler: () => {
            // Handle view action
            console.log('View clicked for:', imageUrl);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            // Handle delete action
            console.log('Delete clicked for:', imageUrl);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // Handle cancel action
            console.log('Cancel clicked');
          }
        }
      ]
    });

    await alert.present();
  }

  viewImageUrl: string | null = null;

 

  async viewImage(imageUrl: string) {
    this.viewImageUrl = imageUrl;
    const modal = await this.modalController.create({
      component: 'modal-component',
      componentProps: {
        imageUrl: this.viewImageUrl,
      },
    });
    await modal.present();
  }

  async dismissModal() {
    this.viewImageUrl = null;
    await this.modalController.dismiss();
  }
}