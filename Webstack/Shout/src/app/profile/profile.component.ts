import { NgModule }       from '@angular/core';

import { Component, OnInit } from '@angular/core';
// import { RouterModule, Routes }  from '@angular/router';
// import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../user-data.service';
// import { Observable } from 'rxjs';
// import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  // template: ``
})
export class ProfileComponent implements OnInit {

  users$: Object;

  constructor(private user: UserDataService) { }

  ngOnInit() {

  }



}
