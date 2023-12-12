import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  myFav: any;
  constructor(private _ToastrService: ToastrService, private _FavoritesService: FavoritesService) { }

  ngOnInit() {
    this.getAllFav()
  }

  getAllFav() {
    this._FavoritesService.onGetAllFav().subscribe({
      next: (res) => {
        console.log(res);
        this.myFav = res.data;
      }
    })
  }

  onRemoveFav(id: number) {
    this._FavoritesService.onRemoveFav(id).subscribe({
      next: (res) => {
        console.log(res);

      },
      error: () => {

      }, complete: () => {
        this._ToastrService.success('Removed From Fav', 'success');
        this.getAllFav()
      }
    })
  }
}
