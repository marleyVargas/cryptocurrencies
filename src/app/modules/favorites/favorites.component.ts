import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoinService } from 'src/app/services/coin.service';
import { FavoriteActions } from 'src/app/store/favorite.actions';
import { selectFavoriteCollection } from 'src/app/store/favorite.selector';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  favorites$ = this.store.select(selectFavoriteCollection);
  dataSource = <any>[];

  constructor(
    private store: Store<{ favorites: string[] }>,
    private _coinService: CoinService,    
    ) {
   
  }

  ngOnInit(): void {   
   
    //this.getFavorites();
  }


  deleteFavorite(favoriteId: string){
    this.store.dispatch(FavoriteActions.removeFavorite({ favoriteId }));
  }

  getFavorites(){
    
    // this._coinService.getAssetFilter(this.favorites).subscribe(con => {
    //   this.dataSource = con;
    // })   
  }
}
