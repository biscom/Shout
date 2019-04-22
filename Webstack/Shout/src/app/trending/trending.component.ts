import {Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {PostsService} from './../posts.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css',
              './categories.css',
              './css/font/typicons.min.css',
              './css/font/typicons.css',
              './css/nav.css',
              './css/report.css',
              './css/post-options.css',
              './css/dashboard.css',
              './css/bounce.css']
})

export class TrendingComponent implements OnInit {

   @ViewChild('alltags') 
   private alltags: ElementRef;

  constructor(private postService: PostsService, private renderer: Renderer2) { }

  private Posts = []

  ngOnInit() {
    this.getPosts("all", "recent");

    // Toggle chevron icon for comment dropdown button

    $("#showComments").click(function() {
      console.log("here");
      $(this).parent().siblings(".postBottom").slideToggle();
      $(this).toggleClass("fa-chevron-down fa-chevron-up");
    });

    // Category interface in sidebar

    $("#categoryViewSelect").children().click(function() {
      var selectedClasses = $(this).attr('class');
      selectedClasses = selectedClasses.replace("notSelected", "");
        $(this).parent().siblings(".categoryLabel").attr("class", selectedClasses);
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

    //var postText = $(this).closest('div').find('.msg-content').text();
  // console.log(postText)
    $('#btn-sign-up').click(function(){
      var buttonId = $(this).attr('id');
      var id = buttonId.split("-")[0];
      console.log(id);
      $('#modal-container').removeAttr('class').addClass(id);
      $('body').addClass('modal-active');
    });

    $('#sign-up').click(function() {
      $('#modal-container').addClass('out');
      $('body').removeClass('modal-active');

    });

    $('.modal-background').click(function(ev) {
      console.log(ev.target);
      if(ev.target != this) return;
      else {
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
      }


  
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
    let newVal = value.replace(/[^\w\s]/gi, '')
    return newVal
  }











}
