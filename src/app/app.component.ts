import { Component, Renderer2 } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { NetworkService } from './util/service/network.service';
import { OfflineService } from 'src/app/util/service/services/offline.service';
import { Subscription } from 'rxjs';
import { Network } from '@capacitor/network'; // Import Network
import { Storage } from '@ionic/storage-angular';


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
  alertController: any;
  
  constructor(
    private menu: MenuController,
    private router: Router,
    private platform: Platform,
    private screenOrientation: ScreenOrientation,
    private networkService: NetworkService,
    private offlineService: OfflineService,
    private renderer: Renderer2,
    private storage: Storage
    
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
    const dashboardRoutes = [
      '/dashboard',
      '/upload-image',
      '/recommendations',
      '/thank-you',
      '/notifications',
      '/special-event',
      '/navigate-to-outlet',
      '/photos',
      '/addresses',
      '/view-outlet',
      '/location',
      '/complete-inspection',
      '/inspections',
      '/update-gis',
      '/my-tasks',
      '/edit-complaint2',
      '/business-conduct',
      '/verify',
      '/edit-complaint',
      '/complaints',
      '/view-complaint',
      '/help',
      '/complete-gis-report'
    ];

    const isDashboardRoute = dashboardRoutes.some(route => this.currentUrl.includes(route));

    this.menu.enable(!isDashboardRoute, 'another-menu');
    this.menu.enable(isDashboardRoute, 'main-menu');
    this.menu.open(isDashboardRoute ? 'main-menu' : 'another-menu');
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
        this.isOnline = status.connected;
        if (!this.isOnline) {
          this.showAlert();
        }
      });
    });
  }

  logout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('uToken');
  }

  async ngOnInit() {

    await this.storage.create();
  
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
