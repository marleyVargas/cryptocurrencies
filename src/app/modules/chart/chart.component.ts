import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { Favorite } from 'src/app/models/favorite.model';
import { CoinService } from 'src/app/services/coin.service';
import { selectFavoriteCollection } from 'src/app/store/favorite.selector';
import { apiKey, apiKeySocket, websocketUri } from 'src/environments/environment';

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
    
  }

  ngOnInit(): void {   

    this.initChart()   

    this.favorites$.subscribe(res =>{
      this.favorites = [...res];
    })

    this.getRealTime()
  }

  getRealTime(){    
    
    if(!this.favorites.length) return;      

    var symbols_id: any[] = [];

    var exchange_id = "BITSTAMP" 
    this.favorites.forEach((element)=>{
      symbols_id.push(`${exchange_id}_SPOT_${element}`)        
    })
   
    if(!symbols_id.length) return

    const socket = new WebSocket(websocketUri);
    var data: any = {};
    var time_exchange: any[] = [];
    var chart = this.chart;

    socket.onopen = function (event) {
        socket.send(JSON.stringify({
            "type": "hello",
            "apikey": apiKeySocket,
            "subscribe_data_type": ["trade"],
            //"subscribe_filter_symbol_id": symbols_id
            "subscribe_filter_symbol_id":  ["BITSTAMP_SPOT_BTC_USD$", "BITFINEX_SPOT_BTC_LTC$"]
        }));
      };

    socket.onmessage = function (event) {
    
        data = JSON.parse(event.data);

        time_exchange.push(data.time_exchange);

        chart.data.labels = time_exchange;
        chart.data.datasets[0].data.push(data.price); 
        chart.update()

        socket.onerror = function (error) {
            console.log(`WebSocket error: ${error}`);
        };
    }
      
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
          },
      }
    });
  }

}

