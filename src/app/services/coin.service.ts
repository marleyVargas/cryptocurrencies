import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { coinApiUri } from 'src/environments/environment';
import { apiKey } from 'src/environments/environment';

@Injectable({
  providedIn: "root"
})
export class CoinService {

 private _httpHeaders;

  constructor(private _http: HttpClient) {
    this._httpHeaders = new HttpHeaders().set('X-CoinAPI-Key', apiKey); 
  }

  public getAssets(): Observable<any> {
    return this._http.get<any>(`${coinApiUri}/assets`, { headers: this._httpHeaders });
  }

  public getAssetById(assetId: number): Observable<any> {
    return this._http.get<any>(`${coinApiUri}/assets/${assetId}`, { headers: this._httpHeaders });
  }


}

