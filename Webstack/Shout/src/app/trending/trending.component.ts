import {Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {PostsService} from './../posts.service';
import { FormBuilder, Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';


@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css',
              './categories.css',
              './css/font/typicons.min.css',
              './css/font/typicons.css',
              './css/report.css',
              './css/post-options.css',
              './css/dashboard.css',
              './css/bounce.css',
              './css/filter.css']
})

export class TrendingComponent implements OnInit {

   @ViewChild('alltags') 
   private alltags: ElementRef;
   private allfilters: ElementRef;

   /* tag sort */
   private funny: ElementRef;
   private academics: ElementRef;
   private events: ElementRef;
   private sports: ElementRef;
   private greek: ElementRef;
   private random: ElementRef;
   private discussion: ElementRef;
   private alert: ElementRef;
   private postText: ElementRef;
   private anon: ElementRef;
   private sortMethod: string;

  constructor(private postService: PostsService,
              private renderer: Renderer2,
              private http: HttpClient) { }

  private Posts = []
  private url = "http://localhost:3000"
  private tags = [];

  ngOnInit() {
    this.getPosts("all", "recent");

    // Toggle chevron icon for comment dropdown button

    // $(".showComments").click(function() {
    //   console.log("here");
    //   $(this).parent().siblings(".postBottom").slideToggle();
    //   $(this).toggleClass("fa-chevron-down fa-chevron-up");
    // });

    // Category interface in sidebar

    $("#categoryViewSelect").children().click(function() {
      var selectedClasses = $(this).attr('class');
      selectedClasses = selectedClasses.replace("notSelected", "");
        $(this).parent().siblings(".tag-select").children('.categoryLabel').attr("class", selectedClasses);
    });

    // Category interface in new post

    $("#categoryOptions").children().click(function() {
      $(this).removeClass("notSelected");
      $(this).siblings().each(function() {
        if (!$(this).hasClass("notSelected")) {
          $(this).addClass("notSelected");
        }
      });
    });

    // Anonymous sldier

    $('input[type=checkbox]').change(function() {
      var counter = 0;
      var clicked = $(this).data('index');
      $('input[type=checkbox]').each(function() {
        if((<any>$(this)).checked) {
          counter++;
        } 
      });

      if(counter == 3) {    
        var toDisable = clicked;
        while(toDisable == clicked) {
          toDisable = Math.round(Math.random()*2);
        }

        (<any>$("input:eq("+ toDisable +")"))[0].checked = false;
      }

    });

    $('#tags').on('click','.tag',function(){
       if( confirm("Really delete this tag?") ) $(this).remove(); 
    });


    var closeIcon =   $('svg.close');
    var container = $('.filter-container');
    var list = container.find('ul');
    var links = container.find('a');
    var text = container.find('span');


    links.on('click', function() {
      links.removeClass('active');
      $(this).addClass('active');
      text.text($(this).text()).addClass('fade');

      setTimeout(function() {
        text.removeClass('fade');
      }, 50);

      list.toggle();
      // closeIcon.toggleClass('active');
    });


}

upVote(event: any) {
  let upvote = (event.target as HTMLElement);
  console.log(upvote);
  let score = (upvote.nextElementSibling as HTMLElement);
  console.log(score);
  console.log(score.innerText);
  let s = parseInt(score.innerText) + 1
  upvote.nextElementSibling.innerHTML = s;


}
downVote(event: any) {
  let downvote = (event.target as HTMLElement);
  console.log(downvote);
  let score = (downvote.previousElementSibling as HTMLElement);
  console.log(score);
  console.log(score.innerText);
  let s = parseInt(score.innerText) - 1
  downvote.previousElementSibling.innerHTML = s;


}

  getPosts(tag, sortMethod){
    this.postService.getTopPosts(tag, sortMethod)
      .subscribe((res: any[]) =>{
          this.Posts = res;
      }); 
  }

  addTags(event: any){
    const span = this.renderer.createElement('span');
    console.log(event.target.value);
    this.tags.push(event.target.value);
    const text = this.renderer.createText(this.transform(event.target.value));
    this.renderer.appendChild(span, text);
    this.renderer.setAttribute(span, 'class', 'tag');
    this.renderer.appendChild(this.alltags.nativeElement, span);
  }

  transform(value: string): string {
    let newVal = value.replace(/[^\w\s]/gi, '').toLowerCase()
    return newVal
  }

  toggleClass(event: any) {
    let filter = (event.target as HTMLElement);
    const hasClass = filter.classList.contains('active');
    
    if(hasClass) {
      this.renderer.removeClass(event.target, 'active');
      $('.filter-container').find('ul').toggle();
      // this.renderer.addClass("close");
    } 
    else {
      // this.renderer.removeClass(event.target, "close");
      this.renderer.addClass(event.target, 'active');
      $('.filter-container').find('ul').toggle();
    }
  }

  parseTag(event: any) {
    let filter = (event.target as HTMLElement);
    let classes = filter.classList;
    this.getTaggedPosts(classes[1].toLowerCase());

  }

  /* SORTING POSTS */
  getTaggedPosts(tag: string) {
    console.log(this.http.get(this.url + "/posts?tag=" + tag));
    return this.http.get(this.url + "/posts?tag=" + tag);
  }

  parseSort(event: any) {
    let filter = (event.target as HTMLElement);
    let classes = filter.classList;
    console.log(classes[0]);
    let sortMethod = classes[0];
    let tag = "all";
    console.log(filter.attributes["href"]);
    this.getTopPosts(tag, classes[0]);
    


  }

  toggleComments(event: any) {
    let comment = (event.target as HTMLElement);
    console.log(comment);
    let parent = (comment.parentNode as HTMLElement)
    let postBottom = (parent.nextElementSibling as HTMLElement);
    console.log(postBottom);
    console.log(postBottom.classList);
    if (postBottom.classList.length == 1) {
      this.renderer.addClass(postBottom, "hide");
    }

    else {
      this.renderer.removeClass(postBottom, "hide");
    }
    
  }

  createPost() {
    let anon = $('#switch').prop('checked');
    console.log(anon);
    let post = $('#newPostText').val();
    console.log(post);
    console.log(this.tags);
    var uid = 1;
    let user_id = 1;
    this.addPost(user_id, post, uid);

  }

  getTopPosts(tag: string, sortMethod:string){
    return this.http.get(this.url + "/top?tag="+tag+"&sortMethod="+sortMethod);
  }

 addPost(user_id, msg_body, univid){
    let postInfo={
      user_id : user_id,
      msg_body : msg_body,
      univid : univid
    };
    console.log(postInfo);
    return this.http.post(this.url+"/addPost", postInfo);
  }




addComment(user_id, msg_body, likes, dislikes){
    let postInfo={
      user_id : user_id,
      msg_body : msg_body,
      likes: likes,
      dislikes: dislikes
    };
    return this.http.post(this.url+"/addComment", postInfo);
  }



}