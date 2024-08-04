
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Geolocation } from '@capacitor/geolocation';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  latitude?: any;
  longitude?: any;
  showManualInput = false;
  input:string='';
  addresses: any[] = [];

  streetName:string=''
  number:string=''
  town:string=''
  city:string=''
  province=''
  postalCode=''

  //private apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${environment.googleMapsApiKey}`;
  private geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?key=${environment.googleMapsApiKey}`;
  fullAddress: string = '';

  constructor(private http:HttpClient, private router: ActivatedRoute) { }




  ngOnInit() {

    this.router.paramMap.subscribe(param => {

      this.latitude = param.get('latitude');
      this.longitude = param.get('longitude');
      
      console.log(this.latitude+"  "+ this.longitude);
      
    });

  }

  //private googleMapsBaseUrl = 'https://www.google.com/maps/search/';
  //address:any="10 Bonza Bay Rd, Beacon Bay North, East London, 5205"

  async getCurrentPosition() {
    try {
  
      let url = `geo:${this.latitude},${this.longitude}?q=${this.latitude},${this.longitude}`
      //let url = `https://www.google.com/maps/dir/?api=1&destination=${this.latitude},${this.longitude}`;
      


      window.open(url,'_system')
      
      
    } catch (err) {
      console.error('Error getting location', err);
    }
    
   
  }

  

  toggleManualInput() {
    this.showManualInput = !this.showManualInput;
  }

  onInputChange() {
    // if (this.input.length > 2) {
    //   this.getAddresses(this.input).subscribe(response => {
    //     this.addresses = response.predictions;
    //   });
    // } else {
    //   this.addresses = [];
    // }
  }

  // getAddresses(input: string) {
  //   const url = `${this.apiUrl}&input=${input}`;
  //   return this.http.get<any>(url);
  // }

  getAddressFromCoordinates(latitude: number, longitude: number) {
    const url = `${this.geocodeUrl}&latlng=${latitude},${longitude}`;
    this.http.get<any>(url).subscribe(response => {
      if (response.results && response.results.length > 0) {
        this.fullAddress = response.results[0].formatted_address;
        console.log(this.fullAddress);
      }
    });
  }

}

