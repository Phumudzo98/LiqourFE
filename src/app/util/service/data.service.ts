import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private sharedData: string='';

  constructor() { }

  setData(data: any) {
    this.sharedData = data;
    console.log(this.sharedData);
    
  }

  getData() {
    
    console.log(this.sharedData);
    return this.sharedData;
    
  }
}
