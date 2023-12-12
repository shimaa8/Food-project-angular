import { Component, OnInit } from '@angular/core';
import { UsersAdminService } from './services/users-admin.service';
import { IUser, IUserTable } from './models/admin-users';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  pageSize: number = 25;
  pageNumber: number | undefined = 1;
  searchValue: string = '';
  groupId: number = 0;
  tableResponse: IUserTable | undefined
  tableData: IUser[] = [];
  constructor(private _UsersAdminService: UsersAdminService) { }

  ngOnInit() {
    this.getTableData()
  }
  getTableData() {
    let parms = {}
    if (this.groupId == 1 || this.groupId == 2) {

      parms = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        userName: this.searchValue,
        groups: this.groupId
      }
    }
    else {
      parms = {
        pageSize: this.pageSize,
        pageNumber: this.pageNumber,
        userName: this.searchValue,
      }
    }
    this._UsersAdminService.getAllUsers(parms).subscribe({
      next: (res: IUserTable) => {
        // this.categoryData = res
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;

        console.log(this.tableData);

      }
    })
  }

}
