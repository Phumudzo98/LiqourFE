import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-summons',
  templateUrl: './summons.page.html',
  styleUrls: ['./summons.page.scss'],
})
export class SummonsPage implements OnInit {

  constructor(private spinner:NgxSpinnerService)
   { }

  ngOnInit() {
  }

  public onSubmit(): void {
    this.spinner.show();
  
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }

}
