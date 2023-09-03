import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxSelectBoxModule,
  DxCheckBoxModule,
} from 'devextreme-angular';
import { CoinService } from 'src/app/services/coin.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  @ViewChild('tableCoin') dataGrid!: DxDataGridComponent;

  assets = <any>[];
  //data!: MatTableDataSource<any>;
  columnsToDisplay = ['date', 'merchInvoice', 'merchant', 'location', 'icao', 'dodaac', 'tail', 'item', 'total', 'card', 'status'];
  
  constructor(private _coinService: CoinService) {
    this._coinService.getAssets().subscribe(res => {
      this.assets = res;
    })
  }

  ngOnInit(): void {
    
   
  }

}
