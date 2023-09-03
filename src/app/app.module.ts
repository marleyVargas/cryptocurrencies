import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { HomePageComponent } from './modules/home-page/home-page.component';
import { FavouritesComponent } from './modules/favourites/favourites.component';
import { HttpClientModule } from '@angular/common/http';
import { DxButtonModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FavouritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    HttpClientModule,
    DxButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
