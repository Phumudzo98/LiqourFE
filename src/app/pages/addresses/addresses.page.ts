import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
interface Address {
  title: string;
  line1?: string;
  line2?: string;
  city?: string;
  country?: string;
}
@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.page.html',
  styleUrls: ['./addresses.page.scss'],
})
export class AddressesPage implements OnInit {



  ngOnInit() {
  }
  showAddressFields = false;
  editMode = false;
  editIndex: number | null = null;
  newAddress: Address = {
    title: '',
    line1: '',
    line2: '',
    city: '',
    country: ''
  };
  addresses: Address[] = [
    { title: 'Home', line1: 'Address line 1', line2: 'Address line 2', city: 'City', country: 'Country' }
  ];

  constructor(private alertController: AlertController, private actionSheetController: ActionSheetController) {}

  toggleAddressFields() {
    this.showAddressFields = !this.showAddressFields;
    if (!this.showAddressFields) {
      this.clearForm();
    }
  }

  saveAddress() {
    if (this.editMode && this.editIndex !== null) {
      // Update existing address
      this.addresses[this.editIndex] = { ...this.newAddress };
    } else {
      // Add new address
      this.addresses.push({ ...this.newAddress });
    }
    this.clearForm();
    this.showAddressFields = false;
    this.editMode = false;
    this.editIndex = null;
  }

  clearForm() {
    this.newAddress = {
      title: '',
      line1: '',
      line2: '',
      city: '',
      country: ''
    };
  }

  async presentOptions(address: Address, index: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: [
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => {
            this.editAddress(address, index);
          }
        },
        {
          text: 'Delete',
          icon: 'trash-outline',
          role: 'destructive',
          handler: () => {
            this.deleteAddress(index);
          }
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  editAddress(address: Address, index: number) {
    this.newAddress = { ...address };
    this.showAddressFields = true;
    this.editMode = true;
    this.editIndex = index;
  }

  deleteAddress(index: number) {
    this.addresses.splice(index, 1);
  }
}