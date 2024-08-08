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
  imageSources: { src: string, description: string }[] = [];
  dropdownVisible: { [index: string]: boolean } = {};

  constructor(
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private modalController: ModalController,
    private eRef: ElementRef
  ) {}

  ngOnInit() {}

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
    console.log('Image Data:', image);
    if (image.dataUrl) {
      const description = await this.promptForDescription();
      if (description !== null) {
        const modifiedImage = await this.addTimestampToImage(image.dataUrl);
        this.imageSources.push({ src: modifiedImage, description });
        console.log('Image Source Added:', { src: modifiedImage, description });
      }
    }
  }

  async promptForDescription(): Promise<string | null> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Add Description',
        inputs: [
          {
            name: 'description',
            type: 'text',
            placeholder: 'Enter image description'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(null);
            }
          },
          {
            text: 'Save',
            handler: (data) => {
              resolve(data.description);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  async addTimestampToImage(imageDataUrl: string): Promise<string> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (ctx) {
          canvas.width = img.width;
          canvas.height = img.height;

          // Draw the image on the canvas
          ctx.drawImage(img, 0, 0);

          // Add the timestamp
          const timestamp = new Date().toLocaleString();
          ctx.font = '30px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign = 'right';
          ctx.fillText(timestamp, canvas.width - 20, canvas.height - 20);

          // Convert canvas to data URL
          const modifiedImage = canvas.toDataURL('image/jpeg');
          resolve(modifiedImage);
        }
      };
      img.src = imageDataUrl;
    });
  }

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
    const index = this.imageSources.findIndex(image => image.src === imageUrl);
    if (index !== -1) {
      this.imageSources.splice(index, 1);
      this.dropdownVisible[index] = false;
    }
  }

  async viewImage(image: string) {
    const modal = await this.modalController.create({
      component: ViewImagePage,
      componentProps: { image },
      backdropDismiss: true // This enables clicking outside the modal to dismiss it
    });
    return await modal.present();
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }
}
