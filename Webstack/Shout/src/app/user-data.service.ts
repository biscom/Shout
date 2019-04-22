import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getProfileInfo() {
    // finish next line with api url
    // return this.http.get('');
    return this.http.get("localhost:3000/profileInfo");   
  }
}
