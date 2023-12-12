import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IRecipeTable, IRecipe, ITag } from 'src/app/admin/recipes/models/recipe';
import { RecipeService } from 'src/app/admin/recipes/services/recipe.service';
import { HelperService } from 'src/app/services/helper.service';
import { RecipeDataComponent } from '../recipe-data/recipe-data.component';
import { FavoritesService } from '../../favorites/services/favorites.service';

@Component({
  selector: 'app-USER-RECIPES',
  templateUrl: './USER-RECIPES.component.html',
  styleUrls: ['./USER-RECIPES.component.css']
})
export class USERRECIPESComponent implements OnInit {

  pageSize: number = 25;
  pageNumber: number | undefined = 1;
  tableResponse: IRecipeTable | undefined;
  tableData: IRecipe[] = [];
  searchValue: string = ''
  recipeData: any;
  tags: ITag[] = [];
  tagId: any
  constructor(private _FavoritesService: FavoritesService, private _RecipeService: RecipeService, private _HelperService: HelperService,
    private dialog: MatDialog, private _ToastrService: ToastrService) { }

  ngOnInit() {
    this.getAllTags();
    this.getTableData()
  }


  openDialog(recipeItem: IRecipe) {
    const dialogRef = this.dialog.open(RecipeDataComponent, {
      data: recipeItem,
      width: '40%'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);

        this.addToFav(result)
      }

    });
  }

  addToFav(id: number) {
    this._FavoritesService.onAddToFav(id).subscribe({
      next: (res) => {
        console.log(res);

      }, error: (err) => {
        console.log(err);

      }, complete: () => {
        this._ToastrService.success('Added To Your Fav', 'Success')
      }
    })
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
