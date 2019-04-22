import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private url = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  getProfileInfo() {
    return this.http.get(this.url + "/profileInfo");
  }

  changeUsername(new_username, password) {
    var new_info = {
      new_username : new_username,
      password : password
    };
    return this.http.post(this.url + "/updateUsername", new_info);
  }

  changePassword(username, old_password, new_password){
    var new_info ={
      username : username,
      old_password: old_password,
      new_password : new_password
    };

    return this.http.post(this.url + "/updatePassword", new_info);
  }

}
