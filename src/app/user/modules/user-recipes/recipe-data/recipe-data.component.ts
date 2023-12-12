import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRecipe } from 'src/app/admin/recipes/models/recipe';

@Component({
  selector: 'app-recipe-data',
  templateUrl: './recipe-data.component.html',
  styleUrls: ['./recipe-data.component.css']
})
export class RecipeDataComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecipeDataComponent>, @Inject(MAT_DIALOG_DATA) public data: IRecipe) { }

  ngOnInit() {
    console.log(this.data);

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
