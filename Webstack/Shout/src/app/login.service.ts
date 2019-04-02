import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  private url = "http://localhost:3000"

  logIn(username, password){
    let auth = this.http.get(this.url + "/login?username="+username+"&password="+password);

  }
}
