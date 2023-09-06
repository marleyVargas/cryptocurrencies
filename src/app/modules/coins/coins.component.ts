import { Component, Input, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { DxDataGridComponent } from 'devextreme-angular';
import { CoinService } from 'src/app/services/coin.service';
import { FavoriteActions } from 'src/app/store/favorite.actions';
import { selectFavoriteCollection } from 'src/app/store/favorite.selector';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
export class CoinsComponent {

  @ViewChild('tableCoin') dataGrid!: DxDataGridComponent;
  @Input() dataSource = <any>[];

  favorites$ = this.store.select(selectFavoriteCollection);
  icons: any[] = []

  constructor(
    private store: Store<{ count: number }>,
    private _coinService: CoinService,
    ) {
      if(localStorage.getItem("icons")?.length)
        this.icons = JSON.parse(localStorage.getItem("icons")??'');
      else
        _coinService.getIcons().subscribe(res =>{
          this.icons = [...res];
          localStorage.setItem("icons", JSON.stringify(this.icons))
      })
  }

  addFavorite(id: string, name: string, price: number, timestamps: string){
    var icon = this.getIcon(id);
    var favorite={
      id: id,
      name : name,
      icon : icon,
      price :price,
      timestamps : timestamps
    }
    this.store.dispatch(FavoriteActions.addFavorite({ favorite  }));    
  }

  deleteFavorite(favoriteId: string){
    this.store.dispatch(FavoriteActions.removeFavorite({ favoriteId }));
  }

  isFavorite(assetId: string): boolean{
    var result;
    this.favorites$.subscribe(res =>{
      result = res?.find((x) => x.id === assetId) ?? "";       
    })
    return result != "";
  }

  getIcon(assetId : string){
    return this.icons.find((x) => x?.asset_id === assetId)?.url
  }
}
