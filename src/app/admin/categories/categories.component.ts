import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { ICategory, ICategoryTable } from './models/category';
import { PageEvent } from '@angular/material/paginator';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/sheard/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  pageSize: number = 5;
  pageNumber: number | undefined = 1;
  tableResponse: ICategoryTable | undefined;
  tableData: ICategory[] | undefined = [];
  searchValue: string = ''
  categoryData: any;
  constructor(private _CategoryService: CategoryService, private dialog: MatDialog, private _ToastrService: ToastrService) { }

  ngOnInit() {
    this.getTableData()
  }

  getTableData() {

    let parms = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue
    }
    this._CategoryService.getCategories(parms).subscribe({
      next: (res) => {
        // this.categoryData = res
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data
      }
    })
  }
  handlePageEvent(e: PageEvent) {
    console.log(e);
    // this.tableResponse?.totalNumberOfRecords = e.length;
    this.pageSize = e.pageSize
    this.pageNumber = this.tableResponse?.pageNumber;
    this.getTableData()
    // this.pageEvent = e;
    // this.length = e.length;
    // this.pageSize = e.pageSize;
    // this.pageIndex = e.pageIndex;
  }


  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {},
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {

        this.onAddNewCategory(result)
      }

    });
  }
  openDeleteDialog(categoryData: any): void {
    console.log(categoryData);

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: categoryData,
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {

        console.log(result.id);
        this.ondeleteCategory(result.id)
      }

    });
  }
  onAddNewCategory(data: string) {
    this._CategoryService.addCategory(data).subscribe({
      next: (res) => {
        console.log(res);

      }, error: (err) => {
        console.log(err);

      }, complete: () => {
        this._ToastrService.success('Category Added Successfully', 'ok');
        this.getTableData()
      }

    })
  }
  ondeleteCategory(id: number) {
    this._CategoryService.deleteCategory(id).subscribe({
      next: (res) => {
        console.log(res);

      }, error: (err) => {
        console.log(err);

      }, complete: () => {
        this._ToastrService.success('Category Deleted Successfully', 'ok');
        this.getTableData()
      }

    })
  }
}
