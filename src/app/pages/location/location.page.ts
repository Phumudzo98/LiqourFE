import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  latitude?: number;
  longitude?: number;
  showManualInput = false;

  constructor() { }

  async getCurrentPosition() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;

      console.log(this.latitude);
      console.log(this.longitude);
      
    } catch (err) {
      console.error('Error getting location', err);
    }
  }

  ngOnInit() {
  }

  toggleManualInput() {
    this.showManualInput = !this.showManualInput;
  }

}
