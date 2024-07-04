import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { NetworkService } from './util/service/network.service';
import { OfflineService } from 'src/app/util/service/services/offline.service';
import { Subscription } from 'rxjs';
import { Network } from '@capacitor/network'; // Import Network

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentUrl!: string;
  isSideMenu1: boolean = true;
  activeItem: string = '';
  isOnline: boolean = true;
  private subscriptions: Subscription[] = [];
  
  constructor(
    private menu: MenuController,
    private router: Router,
    private platform: Platform,
    private screenOrientation: ScreenOrientation,
    private networkService: NetworkService,
    private offlineService: OfflineService, // Inject OfflineService
    private renderer: Renderer2
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
    this.initializeApp();
  }

  toggleMenu() {
    this.openCorrectMenu();
  }

  private openCorrectMenu() {
    if (
      this.currentUrl.includes('/dashboard') ||
      this.currentUrl.includes('/upload-image') ||
      this.currentUrl.includes('/recommendations') ||
      this.currentUrl.includes('/thank-you') ||
      this.currentUrl.includes('/notifications') ||
      this.currentUrl.includes('/special-event') ||
      this.currentUrl.includes('/navigate-to-outlet') ||
      this.currentUrl.includes('/photos') ||
      this.currentUrl.includes('/addresses') ||
      this.currentUrl.includes('/view-outlet') ||
      this.currentUrl.includes('/location') ||
      this.currentUrl.includes('/complete-inspection') ||
      this.currentUrl.includes('/inspections') ||
      this.currentUrl.includes('/update-gis') ||
      this.currentUrl.includes('/my-tasks') ||
      this.currentUrl.includes('/edit-complaint2') ||
      this.currentUrl.includes('/business-conduct') ||
      this.currentUrl.includes('/verify') ||
      this.currentUrl.includes('/edit-complaint') ||
      this.currentUrl.includes('/complaints') ||
      this.currentUrl.includes('/view-complaint') ||
      this.currentUrl.includes('/help') ||
      this.currentUrl.includes('/complete-gis-report')
    ) {
      this.menu.enable(false, 'another-menu');
      this.menu.enable(true, 'main-menu');
      this.menu.open('main-menu');
    } else {
      this.menu.enable(false, 'main-menu');
      this.menu.enable(true, 'another-menu');
      this.menu.open('another-menu');
    }
  }

  addHoverEffect(id: string) {
    const activeItem = document.querySelector('.active-item');
    if (activeItem) {
      activeItem.classList.remove('active-item');
    }

    const item = document.getElementById(id);
    if (item) {
      item.classList.add('active-item');
    }

    this.router.navigateByUrl('/' + id);
  }

  setActiveItem(item: string) {
    this.activeItem = item;
    console.log('Active Item:', this.activeItem);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Lock the orientation to portrait
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT)
        .then(() => console.log('Orientation locked'))
        .catch(error => console.log('Error locking orientation:', error));

      // Network status listener
      Network.addListener('networkStatusChange', (status) => {
        if (status.connected) {
          
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('uToken');
  }

  ngOnInit() {
    this.subscriptions.push(
      this.networkService.isOnline$.subscribe(status => {
        this.isOnline = status;
        if (!this.isOnline) {
          this.showAlert();
        }
      })
    );

    this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.isOnline) {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.showAlert();
      }
    });
  }

  showAlert() {
    const alertElement = document.querySelector('.network-alert');
    if (alertElement) {
      alertElement.setAttribute('style', 'display: flex');
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
