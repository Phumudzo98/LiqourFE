import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import SignaturePad from 'signature_pad';


@Component({
  selector: 'app-page-2',
  templateUrl: './page-2.page.html',
  styleUrls: ['./page-2.page.scss'],
})
export class Page2Page implements OnInit {

  page2Form: FormGroup;

  constructor(private fb: FormBuilder, private spinner: NgxSpinnerService,) {
    this.page2Form = this.fb.group({
      trueCopyTo: ['', Validators.required],
      deliveringTo:['', Validators.required],
      dateTime:['', Validators.required],
      inspector: ['', Validators.required],
      fullNames:['', Validators.required],
      clientSignature:['', Validators.required]
    })
   }

  ngOnInit() {
  }

  public onSubmit(): void {
    this.spinner.show();
  
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
  
  signaturePad!: SignaturePad;
  @ViewChild('canvas')
  canvasEl!: ElementRef;
  signatureImg!: string;


  ngAfterViewInit() {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
  }

  startDrawing(event: Event) {
    console.log(event);
    // works in device not in browser

  }

  moved(event: Event) {
    // works in device not in browser
  }

  clearPad() {
    this.signaturePad.clear();
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;
  }

  }



