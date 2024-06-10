import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { ViewImagePage } from '../view-image/view-image.page';


@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.page.html',
  styleUrls: ['./upload-image.page.scss'],
})
export class UploadImagePage implements OnInit {
  imageSources: string[] = [];
 
  user: boolean[] = [];
  constructor(private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private modalController: ModalController,
    private eRef: ElementRef) 
  { }

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

dropdownVisible: { [index: string]: boolean } = {};
toggleDropdown(event: Event, index: number) {
    event.stopPropagation();
    this.dropdownVisible[index] = !this.dropdownVisible[index];
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    Object.keys(this.dropdownVisible).forEach(user => {
      if (this.dropdownVisible[user] && !this.eRef.nativeElement.querySelector('.label').contains(event.target)) {
        this.dropdownVisible[user] = false;
      }
    });
  }
  async deleteImage(imageUrl: string) {
    const alert = await this.createDeleteAlert(imageUrl);
    await alert.present();
  }
  
  private async createDeleteAlert(imageUrl: string) {
    return this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this image?',
      cssClass: 'custom-alert',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary-button',
          handler: () => {
            console.log('Cancel delete');
          }
        },
        {
          text: 'Yes',
          cssClass: 'primary-button',
          handler: () => {
            this.removeImage(imageUrl);
            console.log('Confirm delete');
          }
        }
      ]
    });
  }
  
  private removeImage(imageUrl: string) {
    const index = this.imageSources.indexOf(imageUrl);
    if (index !== -1) {
      this.imageSources.splice(index, 1);
      this.dropdownVisible[index] = false;
    }
  }
  

  
async showOptions(imageUrl: string) {
  const alert = await this.alertController.create({
    header: 'Options',
    message: 'Choose an action for this image:',
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
        cssClass: 'danger',
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

 

  async viewImage(image: string) {
    const modal = await this.modalController.create({
      component: ViewImagePage,
      componentProps: { image },
      backdropDismiss: true // This enables clicking outside the modal to dismiss it
    });
    return await modal.present();
  }


  async dismissModal() {
    this.viewImageUrl = null;
    await this.modalController.dismiss();
  }
}