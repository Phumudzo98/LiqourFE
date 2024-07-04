import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outlet-dashboard',
  templateUrl: './outlet-dashboard.page.html',
  styleUrls: ['./outlet-dashboard.page.scss'],
})
export class OutletDashboardPage implements OnInit {
  private currentIndex: number = 0;
  private slides: HTMLElement[] = [];
  private dots: HTMLElement[] = [];

  constructor(private route: Router) {}

  ngOnInit() {
    this.slides = Array.from(document.querySelectorAll('.slide')) as HTMLElement[];
    this.dots = Array.from(document.querySelectorAll('.dot')) as HTMLElement[];
    this.startSlideShow();
    this.initializeDotClickEvents();
  }

  private startSlideShow() {
    if (this.slides.length === 0) return;

    setInterval(() => {
      this.showSlide((this.currentIndex + 1) % this.slides.length);
    }, 3000);
  }

  private showSlide(index: number) {
    this.slides[this.currentIndex].classList.remove('visible');
    this.dots[this.currentIndex].classList.remove('active');
    this.currentIndex = index;
    this.slides[this.currentIndex].classList.add('visible');
    this.dots[this.currentIndex].classList.add('active');
  }

  private initializeDotClickEvents() {
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.showSlide(index);
      });
    });
  }

  navigateToCorrespondence() {
    this.route.navigate(['correspondence']);
  }

  navigateToUploadDocuments() {
    this.route.navigate(['upload-documents']);
  }

  navigateToOutlets() {
    this.route.navigate(['my-outlets']);
  }

  navigateToPayments() {
    this.route.navigate(['payment-history']);
  }

  navigateToLocation() {
    this.route.navigate(['update-outlet-location']);
  }
}
