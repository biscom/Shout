import { NgModule }       from '@angular/core';

import { Component, OnInit } from '@angular/core';
// import { RouterModule, Routes }  from '@angular/router';
// import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, FormBuilder, Validators } from '@angular/forms';
import { UserDataService } from './../user-data.service';
// import { Observable } from 'rxjs';
// import { HttpModule } from '@angular/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
  // template: ``
})
export class ProfileComponent implements OnInit {

  public show_edit : boolean = false; // show or hide edit button
  public at_edit : boolean = true; // at "About" section or not

  // regular profile info display
  private username;
  private email;
  private password = "";

  private savedPosts = [];

  // edit option
  private editForm;
  // private new_username;
  // private old_password;
  // private new_password1;
  // private new_password2;




  constructor(private userDataService: UserDataService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.userDataService.getProfileInfo()
    .subscribe((res: any[]) => {
      var data = JSON.parse(JSON.stringify(res));
      this.username = data.username;
      this.email = data.email;
    });
  }


  edit_profile() {
    this.show_edit = !this.show_edit;

    this.editForm = this.fb.group({
      new_username : [''],
      old_password : ['', Validators.required],
      new_password1 : [''],
      new_password2 : ['']
    });
  }
  save_profile() {
    if (this.editForm.get('new_username').value != '') {
      this.userDataService.changeUsername(
        this.editForm.get('new_username').value,
        this.editForm.get('old_password').value);
    }

    if (this.editForm.get('new_password1').value != '' ||
      this.editForm.get('new_password2').value != ''){
      // if ()
      // need check user old password
      if (this.editForm.get('new_password1').value !=
      this.editForm.get('new_password2').value) {
        // alert passwords don't match
      }
      else { // password match passed
        if (this.editForm.get('new_username').value != '') {
          // use new username
          this.userDataService.changePassword(this.editForm.get('new_username').value, this.editForm.get('old_password').value, this.editForm.get('new_password1').value);
        }
        else {
          // no new username input, use old username
          this.userDataService.changePassword(this.username, this.editForm.get('old_password').value, this.editForm.get('new_password1').value);
        }
      }
    }

    this.show_edit = !this.show_edit;
  }
  cancel_edit() {
    this.show_edit = false;
  }

  onEdit() {
    this.at_edit = true;
  }
  offEdit() {
    this.at_edit = false;
    this.show_edit = false;
  }
}
