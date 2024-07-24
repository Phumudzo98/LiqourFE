import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { headers, headersSecure } from 'src/app/util/service/const';
import { HelperService } from 'src/app/util/service/helper.service';
//import * as jwt_decode from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';





@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.page.html',
  styleUrls: ['./my-tasks.page.scss'],
})
export class MyTasksPage implements OnInit {
  collect: any[] = [];
  loading: boolean = true; // Add loading state
  decodedToken:any;
  role:any;
  tok:any;
  constructor(private route: Router, private http: HttpClient,private spinner: NgxSpinnerService, private helper: HelperService) { }

  ngOnInit() {
    this.spinner.show();
    let url = "/api/general/get-inbox";
    let token = localStorage.getItem("userToken") 
    const newHeader={
      "Authorization":"Bearer "+token, 
      "Accept":"*/*"
    }

    this.tok=localStorage.getItem('uToken');
    //this.decodedToken=JSON.parse(this.tok);

    console.log(this.tok);
    
      this.decodedToken=jwtDecode(this.tok)
      
      this.role=this.decodedToken.scope;
      console.log(this.role);
      
    
    
    this.http.get<any[]>("http://localhost:8081/api/general/get-inbox", { headers: newHeader }).subscribe(
      response => {
        console.log(response);

        if(this.role==='INSPECTOR')
          {
            this.collect = response.filter(item => item.action === 'Complete Report');
          }
          else{
            this.collect = response;
          }
        
        
        this.spinner.hide();
      },
      error => {
        console.log(error);
      
        this.spinner.hide();
      }
    );
  }

  navigateToBack() {
    this.route.navigate(['dashboard']);
  }

  navigateToTask(action: any, caseId:any)
    {
      
      switch (action) {
        case 'Attach and / or Verify WC Report':
          this.route.navigate(['']);
          break;
        case 'Pre-Registration Inspection':
          this.route.navigate(['']);
          break;
        case 'Complete Report':
          this.route.navigate([`/complete-inspection/${caseId}`]);
          break;
        case 'Verify Application':
          this.route.navigate(['']);
          break;
        case 'Complete GIS Report':
          this.route.navigate([`/complete-gis-report/${caseId}`])

      }
    }

    
}
