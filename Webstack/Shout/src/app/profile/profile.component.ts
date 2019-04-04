import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserDataService } from '../user-data.service';
// import { Observable } from 'rxjs';
// import { HttpModule } from '@angular/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  template: `<div class="overlay">
    <div class="abs-center overlay-card">
      <div class="close">X</div>
      <div class="floated overlay-image">
        <div class="abs-center post-image"></div>
      </div>
      <div class="floated overlay-desc">
        <div class="rela-block desc-title"></div>
        <div class="rela-block desc-author"></div>
        <div class="rela-block desc-desc"></div>
      </div>
    </div>
  </div>

  <div class="rela-block container">
    <div class="rela-block profile-card">
      <div class="profile-pic" id="profile_pic">
      </div>
      <div class="rela-block profile-name-container">
        <div class="rela-block user-name" id="user_name">User Name</div>
        <!-- <div class="rela-block user-desc" id="user_description">User Description Here</div> -->
      </div>
      <div class="rela-block profile-card-stats">
        <div class="floated profile-stat works" id="num_works">28<br></div>
        <div class="floated profile-stat followers" id="num_followers">112<br></div>
        <div class="floated profile-stat following" id="num_following">245<br></div>
      </div>
      <div class="rela-block profile-info">
        <div class="card">

          <!--Card content-->
          <div class="card-body px-lg-5 pt-0">

              <!-- Form -->
              <form class="text-center" style="color: #757575;">

                  <!-- E-mail -->
                  <div class="md-form mt-0">
                      <input type="email" id="materialRegisterFormUsername" class="form-control">
                      <label for="materialRegisterFormUsername">Username</label>
                  </div>

                  <!-- Password -->
                  <div class="md-form">
                      <input type="password" id="materialRegisterFormPassword" class="form-control" aria-describedby="materialRegisterFormPasswordHelpBlock">
                      <label for="materialRegisterFormPassword">Password</label>
                      <small id="materialRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
                          At least 8 characters and 1 digit
                      </small>
                  </div>

                  <!-- Sign up button -->
                  <button class="btn btn-outline-info btn-rounded btn-block my-4
                  waves-effect z-depth-0" type="submit">Save</button>

              </form>

          </div>

        </div>
      </div>

    </div>
  </div>`
})
export class ProfileComponent implements OnInit {

  users$: Object;

  constructor(private user: UserDataService) { }

  ngOnInit() {

  }
}
