import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites/favorites.component';
import { Routes, RouterModule } from '@angular/router';
import { SheardModule } from 'src/app/sheard/sheard.module';


const routes: Routes = [
  { path: '', component: FavoritesComponent },
]

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ]
})
export class FavoritesModule { }
