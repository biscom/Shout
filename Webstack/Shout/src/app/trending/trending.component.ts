import { Component, OnInit } from '@angular/core';
import {PostsService} from './../posts.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  constructor(private postService: PostsService) { }

  private Posts = []

  ngOnInit() {
    this.getPosts("all", "recent");

  }

  getPosts(tag, sortMethod){
    this.postService.getTopPosts(tag, sortMethod)
      .subscribe((res: any[]) =>{
          this.Posts = res;
      }); 
  }


}
