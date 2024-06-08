
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'menu-footer',
    loadChildren: () => import('./headerFooter/menu-footer/menu-footer.module').then( m => m.MenuFooterPageModule)
  },
  {
    path: 'menu-header',
    loadChildren: () => import('./headerFooter/menu-header/menu-header.module').then( m => m.MenuHeaderPageModule)
  },
  {
    path: 'view-complaint',
    loadChildren: () => import('./pages/view-complaint/view-complaint.module').then( m => m.ViewComplaintPageModule)
  },
  {
    path: 'complaints',
    loadChildren: () => import('./pages/complaints/complaints.module').then( m => m.ComplaintsPageModule)
  },
  {
    path: 'edit-complaint',
    loadChildren: () => import('./pages/edit-complaint/edit-complaint.module').then( m => m.EditComplaintPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
  },
  
  {
    path: 'inspector',
    loadChildren: () => import('./pages/inspector completion/inspector.module').then( m => m.InspectorPageModule)
  },
  {
    path: 'business-conduct',
    loadChildren: () => import('./pages/business-conduct/business-conduct.module').then( m => m.BusinessConductPageModule)
  },
  {
    path: 'edit-complaint2',
    loadChildren: () => import('./pages/edit-complaint2/edit-complaint2.module').then( m => m.EditComplaint2PageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'my-tasks',
    loadChildren: () => import('./pages/my-tasks/my-tasks.module').then( m => m.MyTasksPageModule)
  },
  {
    path: 'update-gis',
    loadChildren: () => import('./pages/update-gis/update-gis.module').then( m => m.UpdateGisPageModule)
  },
  {
    path: 'inspections',
    loadChildren: () => import('./pages/inspections/inspections.module').then( m => m.InspectionsPageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./pages/location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'view-outlet',
    loadChildren: () => import('./pages/view-outlet/view-outlet.module').then( m => m.ViewOutletPageModule)
  },
  {
    path: 'addresses',
    loadChildren: () => import('./pages/addresses/addresses.module').then( m => m.AddressesPageModule)
  },
  {
    path: 'photos',
    loadChildren: () => import('./pages/photos/photos.module').then( m => m.PhotosPageModule)
  },

  {
    path: 'navigate-to-outlet',
    loadChildren: () => import('./pages/navigate-to-outlet/navigate-to-outlet.module').then( m => m.NavigateToOutletPageModule)
  },
  {
    path: 'special-event',
    loadChildren: () => import('./pages/special-event/special-event.module').then( m => m.SpecialEventPageModule)
  }



];
    


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


