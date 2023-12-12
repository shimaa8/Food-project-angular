import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  categoryName: string = '';
  constructor(public dialogRef: MatDialogRef<AddEditCategoryComponent>,
  ) { }

  ngOnInit() {
  }
  onClose() {
    this.dialogRef.close();
  }


}
