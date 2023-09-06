import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent, DxTemplateModule } from 'devextreme-angular';
import { CoinService } from 'src/app/services/coin.service';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { FavoriteActions } from 'src/app/store/favorite.actions'
import { Observable } from 'rxjs';
import { selectFavoriteCollection } from 'src/app/store/favorite.selector';
import { Chart, registerables } from 'chart.js';
import { apiKey, websocketUri } from 'src/environments/environment';
import { Favorite } from 'src/app/models/favorite.model';
Chart.register(...registerables);


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  @ViewChild('myChart', { static: true }) canvas: ElementRef<HTMLCanvasElement> | undefined ;
  private ctx!: CanvasRenderingContext2D | null;

  dataSource = <any>[];
  favorites$ = this.store.select(selectFavoriteCollection);
  favorites : Favorite[] = []

  constructor(
    private _coinService: CoinService,
    private store: Store<{ count: number }>
    ) {

    this._coinService.getAssets().subscribe(res => {
      this.dataSource = res;   
      console.log(this.dataSource)       
    })
  }

 
  ngOnInit(): void {   
    this.favorites$.subscribe(res =>{
      this.favorites = [...res];
    })

   
  }

 

}
