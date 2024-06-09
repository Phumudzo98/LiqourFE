import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  latitude?: number;
  longitude?: number;
  showManualInput = false;
  input:string='';
  addresses: any[] = [];

  private apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${environment.googleMapsApiKey}`;


  constructor(private http:HttpClient) { }

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

  onInputChange() {
    if (this.input.length > 2) {
      this.getAddresses(this.input).subscribe(response => {
        this.addresses = response.predictions;
      });
    } else {
      this.addresses = [];
    }
  }

  getAddresses(input: string) {
    const url = `${this.apiUrl}&input=${input}`;
    return this.http.get<any>(url);
  }

}
