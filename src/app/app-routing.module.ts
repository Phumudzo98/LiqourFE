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


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
