import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ProfileComponent } from './profile/profile.component';
import { TrendingComponent } from './trending/trending.component';
import { UniversityComponent } from './university/university.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ProfileComponent,
    TrendingComponent,
    UniversityComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
