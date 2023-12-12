import { IRecipe, IRecipeTable, ITag } from './models/recipe';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ICategoryTable, ICategory } from '../categories/models/category';
import { CategoryService } from '../categories/services/category.service';
import { RecipeService } from './services/recipe.service';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  pageSize: number = 25;
  pageNumber: number | undefined = 1;
  tableResponse: IRecipeTable | undefined;
  tableData: IRecipe[] = [];
  searchValue: string = ''
  recipeData: any;
  tags: ITag[] = [];
  tagId: any
  constructor(private _RecipeService: RecipeService, private _HelperService: HelperService,
    private dialog: MatDialog, private _ToastrService: ToastrService) { }

  ngOnInit() {
    this.getAllTags();
    this.getTableData()
  }


  getTableData() {

    let parms = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue,
      tagId: this.tagId,
    }
    this._RecipeService.getRecipes(parms).subscribe({
      next: (res: IRecipeTable) => {
        // this.categoryData = res
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;

        console.log(this.tableData?.length);

      }
    })
  }

  getAllTags() {
    this._HelperService.getTags().subscribe({
      next: (res) => {
        console.log(res);
        this.tags = res;
      }
    })
  }
}
