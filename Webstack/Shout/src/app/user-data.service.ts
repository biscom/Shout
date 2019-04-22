import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  getProfileInfo() {
    return this.http.get("http://localhost:3000/profileInfo");
  }

  editProfileInfo() {}

}
