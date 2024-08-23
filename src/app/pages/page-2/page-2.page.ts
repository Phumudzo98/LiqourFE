import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import SignaturePad from 'signature_pad';
import { headers, headersSecure } from 'src/app/util/service/const';



@Component({
  selector: 'app-page-2',
  templateUrl: './page-2.page.html',
  styleUrls: ['./page-2.page.scss'],
})
export class Page2Page implements OnInit {

  page2Form: FormGroup;
  alertType!: string;
  alertMessage!: string;
  showAlert!: boolean;
  caseid:any
  summons: any;
  summon:any;
  constructor(private fb: FormBuilder,private router: ActivatedRoute, private spinner: NgxSpinnerService, private http: HttpClient, private aRoute: Router,) {
    this.page2Form = this.fb.group({
      //trueCopyTo: ['', Validators.required],
      receivedBy:['', Validators.required],
      toBeServedTo:['', Validators.required],
      time:['', Validators.required],
      //inspector: ['', Validators.required],
     //fullNames:['', Validators.required],
      //clientSignature:['', Validators.required]
    })
   }

   caseNo:any
   
  ngOnInit() {

    this.router.paramMap.subscribe(param => {
      this.caseNo = param.get('caseId');

      this.router.paramMap.subscribe(param => {
        this.summon = param.get('summon');
      })

  })
}


  public onSubmit(): void {
    this.spinner.show();
    if(!this.signatureImg && this.page2Form.invalid){
      this.showAlertMessage('error', 'please enter all fields');
      return;
    }
    this.summons = this.summons || {};
    this.summons = Object.assign(this.summons, this.page2Form.value);

    const formData = new FormData();
    formData.append('update', new Blob([JSON.stringify(this.summons)], { type: 'application/json' }));

    const imgFile= this.convertSrcToFile(this.signatureImg, `signature.jpg`);
    formData.append('signature', imgFile);

    

    let url = `http://localhost:8081/api/general/update-summons/${this.caseNo}/${this.summon}`;

    this.http.put(url, formData).subscribe(response => {

      this.aRoute.navigate([`/summons/${this.caseNo}`])
      this.spinner.hide();
      
    }, error => {

      console.log(error);
      this.spinner.hide();
    })

  

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

  async savePad() {
    const base64Data = this.signaturePad.toDataURL();
    this.signatureImg = base64Data;

    
    this.showAlertMessage('error', 'Signature Served');
    
  }

  convertSrcToFile(dataURL: string, filename: string): File {
    const arr = dataURL.split(',');
    if (arr.length < 2) {
      throw new Error('Invalid data URL');
    }
    
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch || mimeMatch.length < 2) {
      throw new Error('Unable to extract MIME type');
    }
    
    const mime = mimeMatch[1];
    
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);
    for (let i = 0; i < n; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    
    return new File([u8arr], filename, { type: mime });
  }


   showAlertMessage(type: string, message: string) {
    this.alertType = type;
    this.alertMessage = message;
    this.showAlert = true;

    setTimeout(() => {
      this.showAlert = false;
    }, 3000); 
  }
  }



