import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheardComponent } from './sheard.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { SeemorePipe } from '../seemore.pipe';
import { NgxDropzoneModule } from 'ngx-dropzone';
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule, MatDividerModule, MatIconModule, HttpClientModule, ReactiveFormsModule, FormsModule, MatDialogModule, MatPaginatorModule, NgxDropzoneModule

  ],
  declarations: [SheardComponent, NavbarComponent, SidebarComponent, HomeComponent, DeleteDialogComponent, SeemorePipe],
  exports: [MatButtonModule, MatDividerModule, MatIconModule, HttpClientModule, ReactiveFormsModule, FormsModule,
    MatDialogModule, SidebarComponent, NavbarComponent, HomeComponent, MatPaginatorModule, DeleteDialogComponent, SeemorePipe, NgxDropzoneModule
  ]
})
export class SheardModule { }
