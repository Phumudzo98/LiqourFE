import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from 'src/app/util/service/helper.service';
import { AlertService } from 'src/app/util/service/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  private alertSubscription!: Subscription;
  
  constructor(private route: Router,private helper: HelperService, private alertService: AlertService) { }

  private currentIndex: number = 0;
  private slides: HTMLElement[] = []; 
  private dots: HTMLElement[] = [];

   ngOnInit() {
   

    this.slides = Array.from(document.querySelectorAll('.slide')) as HTMLElement[];
    this.dots = Array.from(document.querySelectorAll('.dot')) as HTMLElement[];
    this.startSlideShow();

    this.alertSubscription = this.alertService.getAlertObservable().subscribe(message => {
      alert(message); 
    });
  }

  ngOnDestroy() {
    if (this.alertSubscription) {
      this.alertSubscription.unsubscribe();
    }
  }


  private startSlideShow() {
    if (this.slides.length === 0) return;

    setInterval(() => {
      this.slides[this.currentIndex].classList.remove('visible');
      this.dots[this.currentIndex].classList.remove('active');
      this.currentIndex = (this.currentIndex + 1) % this.slides.length;
      this.slides[this.currentIndex].classList.add('visible');
      this.dots[this.currentIndex].classList.add('active');
    }, 3000);
  }


  navigateToTasks(){
    this.route.navigate(['my-tasks'])
  }

  navigateToUpdate(){
    this.route.navigate(['update-gis'])
  }

  navigateToInspection(){
    this.route.navigate(['inspections'])
  }

  navigateToComplaints(){
    this.route.navigate(['complaints'])
  }
  navigateToNavigate(){
    this.route.navigate(['navigate-to-outlet'])
  }
}
