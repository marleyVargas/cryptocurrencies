import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Favorite } from 'src/app/models/favorite.model';
import { CoinService } from 'src/app/services/coin.service';
import { selectFavoriteCollection } from 'src/app/store/favorite.selector';
import { apiKey, websocketUri } from 'src/environments/environment';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  
  favorites : Favorite[] = []
  timestamps : string[] = []
  tradeprices: string[] = []
  chart !: Chart<"line", string[], string>
  favorites$ = this.store.select(selectFavoriteCollection);
  
  constructor(
    private _coinService: CoinService,
    private store: Store<{ count: number }>
    ) {
    
      // if(localStorage.getItem("symbols")?.length)
      //   this.symbols = JSON.parse(localStorage.getItem("symbols")??'');
      // else
      //   _coinService.getSymbols().subscribe(res =>{
      //     this.symbols = [...res];
      //     localStorage.setItem("symbols", JSON.stringify(this.symbols))
      // })

    
  }

  ngOnInit(): void {   

    this.initChart()   

    this.favorites$.subscribe(res =>{
      this.favorites = [...res];
    
      this.chart.data.labels = this.favorites.map(function(x){return x.timestamps});
      this.chart.data.datasets[0].data = this.favorites.map(function(x){return x.price?.toString()});
      this.chart.update(); 
    })

    //this.getRealTime()
  }

  getRealTime(){    
    
    if(!this.favorites.length) return;      

    var symbols_id: any[] = [];

    //NOTE: I chose a random exchangeId in order to obtain a data
    var exchange_id = "KRAKENFTS" 
    this.favorites.forEach((element)=>{
      //var symbol = this.symbols.find((x) => x.asset_id_base == element)?.symbol_id
      //if(symbol) 
      symbols_id.push(`${exchange_id}_CRE_${element}`)        
    })
   
    if(!symbols_id.length) return

    const socket = new WebSocket(websocketUri);
    var data: any = {};
    var time_exchange: any[] = [];
    var price: any[] = [];
    socket.onopen = function (event) {
        socket.send(JSON.stringify({
            "type": "hello",
            "apikey": apiKey,
            "subscribe_data_type": ["trade"],
            "subscribe_filter_symbol_id": symbols_id
        }));
      };

    socket.onmessage = function (event) {
    
        data = JSON.parse(event.data);
        time_exchange.push(data.time_exchange);
        price.push(data.price)  
        console.log(data)

        socket.onerror = function (error) {
            console.log(`WebSocket error: ${error}`);
        };
    }
       
    this.timestamps = time_exchange;
    this.tradeprices = price;  

    // Update the chart
    this.chart.update();    
   
      
  }

  initChart(){
   
    const canvas = <HTMLCanvasElement>document.getElementById('myChart');
    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: [], // This will be populated with timestamps
				datasets: [{
					data: [], // This will be populated with trade prices
					label: 'BTC/USD',
					borderColor: '#3e95cd',
					fill: false
				}]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
    });
  }

}

