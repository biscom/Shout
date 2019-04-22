import {Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import {PostsService} from './../posts.service';
import { FormBuilder, Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';

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
   private register: FormGroup;

  constructor(private postService: PostsService,
              private renderer: Renderer2,
              private builder: FormBuilder) { }

  private Posts = []

  ngOnInit() {
    this.getPosts("all", "recent");
    this.register = this.builder.group({
          email:['', [Validators.required, Validators.email]],
          username:['', Validators.required],
          nickname:['', Validators.required],
          password:['', [Validators.required, 
                        Validators.minLength(8)]]
    })

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

    //var postText = $(this).closest('div').find('.msg-content').text();
  // console.log(postText)
    $('#btn-sign-up').click(function(){
      var buttonId = $(this).attr('id');
      var id = buttonId.split("-")[0];
      console.log(id);
      $('#modal-container').removeAttr('class').addClass(id);
      $('body').addClass('modal-active');
    });

    // $('#sign-up').click(function() {
    //   $('#modal-container').addClass('out');
    //   $('body').removeClass('modal-active');

    // });

    $('.modal-background').click(function(ev) {
      if(ev.target != this) return;
      else {
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
      }


    var closeIcon =   document.querySelectorAll('svg.close'),
                      $container = $('.filter-container'),
                      $list = $container.find('ul'),
                      $links = $container.find('a'),
                      $text = $container.find('span');

    // When the '+' icon is clicked...
    $(closeIcon).on('click', function() {
      // Add class to rotate icon to an 'x'
      (<any> $(this)).toggleClass('active');
    
      // Toggle the list
      $list.toggle(); 
    });

//     // When the icon is hovered, add
//     // a class to it's parent so we can style it
//     $(closeIcon).hover(function() {
//       $container.addClass('hover');
//     }, function() {
//       $container.removeClass('hover');
//     });

//     $links.on('click', function() {
//       $links.removeClass('active');
//       $(this).addClass('active');
//       $text.text($(this).text()).addClass('fade');

//       setTimeout(function(){
//         $text.removeClass('fade');
//       }, 800);

//       $list.toggle();
//       (<any>closeIcon).toggleClass('active');
// });



  
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

  saveUser() {
    let email = this.register.get('email').value;
    let user = this.register.get('username').value;
    let nickname = this.register.get('nickname').value;
    let pass = this.register.get('password').value;
    console.log(email, user, nickname, pass);

  }

  toggleClass(event: any) {
    let filter = (event.target as HTMLElement);
    const hasClass = filter.classList.contains('active');
    
    if(hasClass) {
      this.renderer.removeClass(event.target, 'active');
      // this.renderer.addClass("close");
    } 
    else {
      // this.renderer.removeClass(event.target, "close");
      this.renderer.addClass(event.target, 'active');
      this.allfilters.nativeElement.toggle();
    }
  }











}
