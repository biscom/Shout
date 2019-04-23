
import { Component, Renderer2,} from '@angular/core';
import {LoginService} from './login.service';
import { FormBuilder, Validators, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
  				'./app.component.css',
  				'./trending/css/dashboard.css',
  				'./trending/css/nav.css',
          './trending/css/map.css',
          './trending/css/school-filter.css',
          './trending/css/post-options.css',
          './trending/css/report.css',
  				'./trending/trending.component.css'
  			 ]
})
export class AppComponent {
  title = 'Shout';

  private logged_in : boolean = false;
  private username_nav;

  private register: FormGroup;
  private login: FormGroup;
  private latitude: number;
  private longitude: number;
  private mapType: string;
  private uid: number;
  private Unis = []
  
  constructor(private loginService : LoginService,
              private builder: FormBuilder,
              private renderer: Renderer2){}

  ngOnInit() {
    this.register = this.builder.group({
          email:['', [Validators.required, Validators.email]],
          username:['', Validators.required],
          nickname:['', Validators.required],
          password:['', [Validators.required, 
                        Validators.minLength(8)]]


    });

    this.login = this.builder.group({
          username:['', Validators.required],
          password:['', Validators.required]

    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        var location = position.coords;
        console.log(location);
        this.latitude = location.latitude;
        this.longitude = location.longitude;
        this.mapType = 'roadmap';
        this.nearbyUnis(this.latitude, this.longitude);
        
      });
   } 

    

    // $('#sign-up').click(function() {
    //   $('#modal-container').addClass('out');
    //   $('body').removeClass('modal-active');

    // });

    $('.modal-background').click(function(ev) {
      console.log(ev.target);
      if(ev.target != this) return;
      else {
        $('#modal-container').addClass('out');
        $('body').removeClass('modal-active');
      }
    
  });

  }

  // toggleClass(event: any) {
  //   let filter = (event.target as HTMLElement);
  //   const hasClass = filter.classList.contains('active');
    
  //   if(hasClass) {
  //     this.renderer.removeClass(event.target, 'active');
  //     $('.school-container').find('ul').toggle();
  //     // this.renderer.addClass("close");
  //   } 
  //   else {
  //     // this.renderer.removeClass(event.target, "close");
  //     this.renderer.addClass(event.target, 'active');
  //     $('.school-container').find('ul').toggle();
  //   }
  // }

  set_uid(event: any) {
    this.uid = parseInt(event.target.value);
    console.log(this.uid);

  }

  saveUser() {
      let email = this.register.get('email').value;
      let user = this.register.get('username').value;
      let nickname = this.register.get('nickname').value;
      let pass = this.register.get('password').value;
      console.log(email, user, nickname, pass);
      console.log(this.uid);
      this.createAccount(user, pass, nickname, email, this.uid);

  }

  logUser() {
    let user = this.login.get('username').value;
    let pass = this.login.get('password').value;
    console.log(user, pass);
    this.logIn(user, pass);

  }

  // getting 5 nearest universities of location for account creation
  nearbyUnis(lat: number, lon: number){
    this.loginService.getNearbyUnis(lat,lon).subscribe((res : any[])=>{
      this.Unis = res;
      console.log(res);
    });
  }

  createAccount(username: string, password: string, nickname: string, univ_email: string, univid: number){
    this.loginService.createAccount(username, password, nickname, univ_email, univid).subscribe((res :any[])=>{
      console.log(res);

    });
  }

  logIn(username: string, password: string){
    this.loginService.logIn(username, password).subscribe((res :any[])=>{
      console.log(res)

    });
  }

  checkLoginStatus(){
    this.loginService.checkLoginStatus()
      .subscribe((res :any[]) => {
        var data = JSON.parse(JSON.stringify(res));
        this.logged_in = data.valid;
        this.username_nav = data.username;
      });
  }

  openModal(event: any) {
    let signup = (event.target as HTMLElement);
    let button = signup.id;
    let id = button.split("-")[0];
    console.log(id);
    let body = document.getElementsByTagName('body');
    $('#modal-container').addClass(id);
    $('body').addClass('modal-active');
   
  }
}
  