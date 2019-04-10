import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { ProfileComponent } from './profile/profile.component';
import { TrendingComponent } from './trending/trending.component';
import { UniversityComponent } from './university/university.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    TrendingComponent,
    UniversityComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
