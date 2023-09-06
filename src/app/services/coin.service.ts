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

  public getAssetFilter(assets: string[]): Observable<any> {
    return this._http.get<any>(`${coinApiUri}/assets/${assets}`, { headers: this._httpHeaders });
  }

  public getIcons(): Observable<any> {
    return this._http.get<any>(`${coinApiUri}/assets/icons/32`, { headers: this._httpHeaders });
  }

  public getSymbols(): Observable<any> {
    return this._http.get<any>(`${coinApiUri}/symbols`, { headers: this._httpHeaders });
  }

}

