import {Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {PostsService} from './../posts.service';
import { FormBuilder, Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
// import 'jquery-ui-dist/jquery-ui';

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
   private sortMethod: string;

  constructor(private postService: PostsService,
              private renderer: Renderer2,
              private http: HttpClient) { }

  private Posts = []
  private url = "http://localhost:3000"

  ngOnInit() {
    this.getPosts("all", "recent");

    // Toggle chevron icon for comment dropdown button

    $(".showComments").click(function() {
      console.log("here");
      $(this).parent().siblings(".postBottom").slideToggle();
      $(this).toggleClass("fa-chevron-down fa-chevron-up");
    });

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

  getPosts(tag, sortMethod){
    this.postService.getTopPosts(tag, sortMethod)
      .subscribe((res: any[]) =>{
          this.Posts = res;
      }); 
  }

  addTags(event: any){
    const span = this.renderer.createElement('span');
    console.log(event.target.value);
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
    this.getTaggedPosts(classes[1]);

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
    let tag = "everything";
    console.log(filter.attributes["href"]);
    window.location.href = this.url + "/top?tag="+tag+"&sortMethod="+sortMethod;


  }

  // getTopPosts(tag: string, sortMethod:string){
  //   return this.http.get(this.url + "/top?tag="+tag+"&sortMethod="+sortMethod);
  // }


}
