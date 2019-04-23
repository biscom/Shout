import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }
  private url = "http://localhost:3000"

  getTopPosts(tag, sortMethod){
    return this.http.get(this.url + "/top?tag="+tag+"&sortMethod="+sortMethod,  {
      withCredentials : true
    });
  }
  
  getTopUniversityPosts(tag, sortMethod){
    return this.http.get(this.url + "/topUniversity?tag="+tag+"&sortMethod="+sortMethod, {
      withCredentials : true
    });
  }

  addPost(user_id, msg_body, univid){
    let postInfo={
      user_id : user_id,
      msg_body : msg_body,
      univid : univid
    };
    return this.http.post(this.url+"/addPost", postInfo, {
      withCredentials : true
    });
    }
  
  addComment(user_id,msg_body, likes, dislikes){
    let postInfo={
      user_id : user_id,
      msg_body : msg_body,
      likes: likes,
      dislikes: dislikes
    };
    return this.http.post(this.url+"/addComment", postInfo, {
      withCredentials : true
    });
    }

  getTaggedPosts(tag){
    return this.http.get(this.url+"/posts?tag="+tag);
  }
}