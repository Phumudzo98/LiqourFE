import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { headersSecure } from 'src/app/util/service/const';


@Component({
  selector: 'app-summons',
  templateUrl: './summons.page.html',
  styleUrls: ['./summons.page.scss'],
})
export class SummonsPage implements OnInit {

  constructor(private dateP: DatePipe, private spinner:NgxSpinnerService, private http: HttpClient, private router: ActivatedRoute, private route: Router)
   { }

   caseNo:any
   collectSummons:any[]=[]

  ngOnInit() {

    
    this.router.paramMap.subscribe(param => {
      this.caseNo = param.get('caseId');

      this.getSummons(this.caseNo);

  })
}

public formattedDate(date:any){
  return this.dateP.transform(date,' h:mma', 'UTC');
}

 
public getSummons(caseId:any)
{
  let urlSummons =`http://localhost:8081/api/general/get-summons/${caseId}`


  this.http.get<any>(urlSummons, {headers: headersSecure}).subscribe(response=>
  {

    console.log(response);

    this.collectSummons=response;
    
 })

}

  public onSubmit(summon:any): void {
    this.spinner.show();
  
    setTimeout(() => {

      this.route.navigate([`/page-2/${this.caseNo}/${summon}`]);
      this.spinner.hide();
    }, 2000);
  }

}
