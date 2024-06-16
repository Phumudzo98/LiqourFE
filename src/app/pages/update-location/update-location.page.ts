import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-location',
  templateUrl: './update-location.page.html',
  styleUrls: ['./update-location.page.scss'],
})
export class UpdateLocationPage implements OnInit {


  latitude?: number;
  longitude?:number;

  lat?:number;
  lon?:number;

  
  selectedOption: string = '';
  uploadedFiles: { name: string, size: number }[] = [];
  currentForm: string = 'landing';
  
  @ViewChild('fileInput', { static: false })
  fileInput!: ElementRef<HTMLInputElement>;

  constructor(private route: Router, private eRef: ElementRef, private alertController: AlertController) {}

  ngOnInit() {
  }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.lat = coordinates.coords.latitude;
      this.lon = coordinates.coords.longitude;

      this.longitude=this.lon;
      this.latitude=this.lat;

      //this.getAddressFromCoordinates(this.latitude, this.longitude);
      
    } catch (err) {
      console.error('Error getting location', err);
    }
  }

  
  toggleForms(form: string) {
    this.currentForm = form;
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      if (this.isFileUploaded(file.name)) {
        await this.presentFileExistsAlert();
      } else {
        this.uploadedFiles.push({ name: file.name, size: file.size });
      }
    }
  }

  isFileUploaded(fileName: string): boolean {
    return this.uploadedFiles.some(file => file.name === fileName);
  }

  async presentFileExistsAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Document already uploaded.',
      buttons: ['OK']
    });

    await alert.present();
  }

  navigateToBack() {
    this.route.navigate(['complete-inspection']);
  }

  async presentAlertConfirm(index: number) {
    const alert = await this.alertController.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this document?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            this.deleteItem(index);
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

  deleteItem(index: number) {
    this.uploadedFiles.splice(index, 1);
  }
}