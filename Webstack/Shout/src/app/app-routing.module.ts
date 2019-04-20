import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
<<<<<<< HEAD
// import { TrendingComponent } from './trending/trending.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: TrendingComponent
  // },
=======
import { TrendingComponent } from './trending/trending.component';

const routes: Routes = [
  {
    path: '',
    component: TrendingComponent
  },
>>>>>>> 2fd41ce9a8c39a2c92587d507b071bd0e69ddd99
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
