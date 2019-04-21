import { Component, OnInit } from '@angular/core';
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
              './css/dashboard.css',
              './css/bounce.css']
})
export class TrendingComponent implements OnInit {

  constructor(private postService: PostsService) { }

  private Posts = []

  ngOnInit() {
    this.getPosts("all", "recent");

    // Toggle chevron icon for comment dropdown button

    $(".showComments").click(function() {
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
      counter = 0;
      clicked = $(this).data('index');
      $('input[type=checkbox]').each(function() {
        if($(this)[0].checked) {
          counter++;
        } 
      });

      if(counter == 3) {    
        toDisable = clicked;
        while(toDisable == clicked) {
          toDisable = Math.round(Math.random()*2);
        }

        $("input:eq("+ toDisable +")")[0].checked = false;
      }

    });


    // adding tags

    $(function() {
      $('#tags input').on('focusout', function(){    
        var txt = this.value.replace(/[^a-zA-Z0-9\+\-\.\#]/g,''); // allowed characters list
        if(txt) $(this).before('<span class="tag">'+ txt +'</span>');

        this.value = "";
        this.focus();
      }).on('keyup',function( e ){

        // comma|enter (add more keyCodes delimited with | pipe)
        if(/(188|13)/.test(e.which)) $(this).focusout();

      });

      $('#tags').on('click','.tag',function(){
        if( confirm("Really delete this tag?") ) $(this).remove(); 
      });
    });

  }

  getPosts(tag, sortMethod){
    this.postService.getTopPosts(tag, sortMethod)
      .subscribe((res: any[]) =>{
          this.Posts = res;
      }); 
  }


  

  
  // $(".showComments").click(function() {
  //   $(this).parent().siblings(".postBottom").slideToggle();
  //   $(this).toggleClass("fa-chevron-down fa-chevron-up");
  // });











}
