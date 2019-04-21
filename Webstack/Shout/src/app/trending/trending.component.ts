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
              './css/report.css',
              './css/post-options.css',
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
      var counter = 0;
      var clicked = $(this).data('index');
      $('input[type=checkbox]').each(function() {
        if(this[0].checked) {
          counter++;
        } 
      });

      if(counter == 3) {    
        var toDisable = clicked;
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
        if(txt) {
          $(this).before('<span class="tag">'+ txt +'</span>');

          // this.alltags = '<span class="tag">'+ txt +'</span>';
        }

        $(this).value = "";
        $(this).focus();
      }).on('keyup',function( e ){

        // comma|enter (add more keyCodes delimited with | pipe)
        if(/(188|13)/.test(e.which)) $(this).focusout();

      });

      $('#tags').on('click','.tag',function(){
        if( confirm("Really delete this tag?") ) $(this).remove(); 
      });
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


  

  
  // $(".showComments").click(function() {
  //   $(this).parent().siblings(".postBottom").slideToggle();
  //   $(this).toggleClass("fa-chevron-down fa-chevron-up");
  // });











}
