
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';



const routes: Routes = [


  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'signin',
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
    path: 'view-complaint/:referenceNumber',
    loadChildren: () => import('./pages/view-complaint/view-complaint.module').then( m => m.ViewComplaintPageModule)
  },
  {
    path: 'complaints',
    loadChildren: () => import('./pages/complaints/complaints.module').then( m => m.ComplaintsPageModule)
  },
  {
    path: 'edit-complaint/:referenceNumber',
    loadChildren: () => import('./pages/edit-complaint/edit-complaint.module').then( m => m.EditComplaintPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
  },
  
 
  {
    path: 'business-conduct',
    loadChildren: () => import('./pages/business-conduct/business-conduct.module').then( m => m.BusinessConductPageModule)
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
    path: 'complete-inspection/:caseId',
    loadChildren: () => import('./pages/complete-inspection/complete-inspection.module').then( m => m.CompleteInspectionPageModule)
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
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'thank-you',
    loadChildren: () => import('./pages/thank-you/thank-you.module').then( m => m.ThankYouPageModule)
  },
  {
    path: 'recommendations',
    loadChildren: () => import('./pages/recommendations/recommendations.module').then( m => m.RecommendationsPageModule)
  },
  {
    path: 'upload-image',
    loadChildren: () => import('./pages/upload-image/upload-image.module').then( m => m.UploadImagePageModule)
  },
  {
    path: 'view-image',
    loadChildren: () => import('./pages/view-image/view-image.module').then( m => m.ViewImagePageModule)
  },
  
  {
    path: 'outlet-dashboard',
    loadChildren: () => import('./Outlet/outlet-dashboard/outlet-dashboard.module').then( m => m.OutletDashboardPageModule)
  },
  {
    path: 'outlet-edit-profile',
    loadChildren: () => import('./Outlet/outlet-edit-profile/outlet-edit-profile.module').then( m => m.OutletEditProfilePageModule)
  },
  {
    path: 'outlet-menu-footer',
    loadChildren: () => import('./outletHeaderFooter/outlet-menu-footer/outlet-menu-footer.module').then( m => m.OutletMenuFooterPageModule)
  },
  {
    path: 'update-outlet-location',
    loadChildren: () => import('./Outlet/update-outlet-location/update-outlet-location.module').then( m => m.UpdateOutletLocationPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./Outlet/payment-history/payment-history.module').then( m => m.PaymentHistoryPageModule)
  },
  {
    path: 'correspondence',
    loadChildren: () => import('./Outlet/correspondence/correspondence.module').then( m => m.CorrespondencePageModule)
  },
  
  {
    path: 'view-details',
    loadChildren: () => import('./Outlet/view-details/view-details.module').then( m => m.ViewDetailsPageModule)
  },
  {
    path: 'payment-history',
    loadChildren: () => import('./Outlet/payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'my-outlets',
    loadChildren: () => import('./Outlet/my-outlets/my-outlets.module').then( m => m.MyOutletsPageModule)
  },
  {
    path: 'upload-documents',
    loadChildren: () => import('./Outlet/upload-documents/upload-documents.module').then( m => m.UploadDocumentsPageModule)
  },
  {
    path: 'outlet-dashboard',
    loadChildren: () => import('./Outlet/outlet-dashboard/outlet-dashboard.module').then( m => m.OutletDashboardPageModule)
  },
  {
    path: 'outlet-edit-profile',
    loadChildren: () => import('./Outlet/outlet-edit-profile/outlet-edit-profile.module').then( m => m.OutletEditProfilePageModule)
  },
  {
    path: 'outlet-menu-footer',
    loadChildren: () => import('./outletHeaderFooter/outlet-menu-footer/outlet-menu-footer.module').then( m => m.OutletMenuFooterPageModule)
  },
  {
    path: 'update-outlet-location',
    loadChildren: () => import('./Outlet/update-outlet-location/update-outlet-location.module').then( m => m.UpdateOutletLocationPageModule)
  },
  {
    path: 'payment-history',
    loadChildren: () => import('./Outlet/payment-history/payment-history.module').then( m => m.PaymentHistoryPageModule)
  },
  
  {
    path: 'outlet-settings',
    loadChildren: () => import('./Outlet/outlet-settings/outlet-settings.module').then( m => m.OutletSettingsPageModule)
  },
  {
    path: 'view-documents',
    loadChildren: () => import('./Outlet/view-documents/view-documents.module').then( m => m.ViewDocumentsPageModule)
  },
  {
    path: 'payment-details',
    loadChildren: () => import('./Outlet/payment-details/payment-details.module').then( m => m.PaymentDetailsPageModule)
  },
 
  {
    path: 'outlethaeder',
    loadChildren: () => import('./outletHeaderFooter/outlethaeder/outlethaeder.module').then( m => m.OutlethaederPageModule)
  },
  {
    path: 'special-event-inspections',
    loadChildren: () => import('./pages/special-event-inspections/special-event-inspections.module').then( m => m.SpecialEventInspectionsPageModule)
  },
  {
    path: 'update-location',
    loadChildren: () => import('./pages/update-location/update-location.module').then( m => m.UpdateLocationPageModule)
  },
  {
    path: 'form',
    loadChildren: () => import('./pages/form/form.module').then( m => m.FormPageModule)
  }



];
    


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


