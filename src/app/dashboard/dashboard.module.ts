import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SheardModule } from '../sheard/sheard.module';
import { AdminGuard } from '../Guards/admin.guard';
import { UserGuard } from '../Guards/user.guard';
import { HomeComponent } from '../sheard/home/home.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'admin', canActivate: [AdminGuard], loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule) },
      { path: 'user', canActivate: [UserGuard], loadChildren: () => import('../user/user.module').then(m => m.UserModule) },

    ],
  },
]
@NgModule({
  imports: [
    CommonModule,
    SheardModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
