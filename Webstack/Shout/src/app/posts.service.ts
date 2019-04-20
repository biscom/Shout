import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }
  private url = "http://localhost:3000"

  getTopPosts(tag, sortMethod){
    return this.http.get(this.url + "/top?tag="+tag+"&sortMethod="+sortMethod);
  }

  getTaggedPosts(tag){
    return this.http.get(this.url+"/posts?tag="+tag);
  }
}