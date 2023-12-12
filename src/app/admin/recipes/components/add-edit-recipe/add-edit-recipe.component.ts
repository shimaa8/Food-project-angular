import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/services/helper.service';
import { RecipeService } from '../../services/recipe.service';
import { ICategory, IRecipe, ITag } from '../../models/recipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss']
})
export class AddEditRecipeComponent implements OnInit {
  imgSrc: any;
  tags: ITag[] = [];
  categories: ICategory[] = [];
  recipeId: any;
  isUpdatePage: boolean = false;
  recipeData: any;
  recipeForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    categoriesIds: new FormControl(null),
  })
  constructor(private router: Router, private _ActivatedRoute: ActivatedRoute, private _HelperService: HelperService, private _RecipeService: RecipeService) {
    this.recipeId = _ActivatedRoute.snapshot.params['id'];
    if (this.recipeId) {
      this.isUpdatePage = true;
      this.getRecipesById(this.recipeId)
    }
    else {
      this.isUpdatePage = false
    }

  }

  ngOnInit() {

    this.getAllTags()
    this.getAllCategories()
  }
  getRecipesById(id: number) {
    this._RecipeService.getRecipeById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.recipeData = res;

      }, error: (err) => {

      }, complete: () => {
        this.imgSrc = 'https://upskilling-egypt.com/' + this.recipeData.imagePath
        this.recipeForm.patchValue({
          name: this.recipeData?.name,
          price: this.recipeData?.price,
          description: this.recipeData?.description,
          tagId: this.recipeData?.tag.id,
          categoriesIds: this.recipeData?.category[0].id,
        })
      }
    })
  }

  onSubmit(data: FormGroup) {
    console.log(data.value);

    let myData = new FormData();
    myData.append('name', data.value.name);
    myData.append('price', data.value.price);
    myData.append('description', data.value.description);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('tagId', data.value.tagId);
    myData.append('recipeImage', this.imgSrc, this.imgSrc.name);


    // myData -> add - put 
    if (this.recipeId) {
      // update 
      this._RecipeService.editRecipe(this.recipeId, myData).subscribe({
        next: (res) => {
          console.log(res);

        }, error: () => {

        }, complete: () => {
          this.router.navigate(['/dashboard/admin/recipes'])
        }
      })

    }
    else {

      this._RecipeService.addRecipe(myData).subscribe({
        next: (res) => {
          console.log(res);

        }, error: () => {

        }, complete: () => {
          this.router.navigate(['/dashboard/admin/recipes'])
        }
      })
    }


  }

  edit(){

  }
  add(){
    
  }
  getAllTags() {
    this._HelperService.getTags().subscribe({
      next: (res) => {
        console.log(res);
        this.tags = res;
      }
    })
  }
  getAllCategories() {
    this._HelperService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(res);
      }
    })
  }
  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0]
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
