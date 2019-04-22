import { Component } from '@angular/core';
import {LoginService} from './login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
  				'./app.component.css',
  				'./trending/css/dashboard.css',
  				'./trending/css/nav.css',
  				'./trending/trending.component.css',
  			 ]
})
export class AppComponent {
  title = 'Shout';

  constructor(private loginService : LoginService){}

  //getting 5 nearest universities of location for account creation
  nearbyUnis(){
    //get latitiude and longitude of user
    var lat = 0.0;
    var lon = 0.0;
    this.loginService.getNearbyUnis(lat,lon).subscribe((res : any[])=>{


    });
  }

  createAccount(){
    var username,password,nickname,univ_email,univid;
    this.loginService.createAccount(username, password, nickname, univ_email, univid).subscribe((res :any[])=>{

    });
  }

  logIn(){
    var username, password;
    this.loginService.logIn(username, password).subscribe((res :any[])=>{

    });
  }

  checkLoginStatus(){
    this.loginService.checkLoginStatus().subscribe((res :any[])=>{

    });
  }
}
