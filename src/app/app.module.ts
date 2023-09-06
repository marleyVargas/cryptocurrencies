import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon'
import { LayoutComponent } from './layout/layout.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FavoritesComponent } from './modules/favorites/favorites.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { favoriteReducer } from './store/favorite.reducer';
import { CoinsComponent } from './modules/coins/coins.component';
import { ChartComponent } from './modules/chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LayoutComponent,
    FavoritesComponent,
    CoinsComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DxButtonModule,
    BrowserAnimationsModule,
    DxDataGridModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatTooltipModule,
    StoreModule.forRoot({ collection: favoriteReducer }),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
