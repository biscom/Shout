import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
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
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBIdqBvurPR4Jc_n9GNe4krQyzaCw5gj0I'
    })
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
