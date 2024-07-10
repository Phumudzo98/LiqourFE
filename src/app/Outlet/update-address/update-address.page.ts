import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.page.html',
  styleUrls: ['./update-address.page.scss'],
})
export class UpdateAddressPage implements OnInit {

  addressForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.addressForm = fb.group({
      address: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    })
  }

  ngOnInit() {
  }

}
