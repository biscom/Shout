import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private url = "http://localhost:3000"

  getNearbyUnis(lat, lon){
    let coords = {
      lat : lat,
      lon: lon
    }
    return this.http.get(this.url+"/nearby?lat="+lat+"&lon="+lon);

  }

  createAccount(username, password, nickname,univ_email, univid){
    let accountInfo={
      username : username,
      password : password,
      nickname : nickname,
      univ_email: univ_email,
      univid : univid
    };
    return this.http.post(this.url+"/createAccount", accountInfo);


  }

  logIn(username, password){
    let loginInfo = {
      username : username,
      password : password
    };
    return this.http.post(this.url + "/login",loginInfo);

  }

}
