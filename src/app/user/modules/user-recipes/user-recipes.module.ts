import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { USERRECIPESComponent } from './USER-RECIPES/USER-RECIPES.component';
import { SheardModule } from 'src/app/sheard/sheard.module';
import { RecipeDataComponent } from './recipe-data/recipe-data.component';

const routes: Routes = [
  { path: '', component: USERRECIPESComponent },
]

@NgModule({
  declarations: [USERRECIPESComponent,RecipeDataComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SheardModule
  ]
})
export class UserRecipesModule { }
