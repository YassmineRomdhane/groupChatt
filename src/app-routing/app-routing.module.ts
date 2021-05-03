import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {UserSProfileComponent} from '../app/user-s-profile/user-s-profile.component'
import {UserSignupSigninComponent} from '../app/user-signup-signin/user-signup-signin.component'
import {GroupsSidebarComponent}from '../app/groups-sidebar/groups-sidebar.component'
import {ChatComponent} from '../app/chat/chat.component'
import {ChannelsInfoComponent} from '../app/channels-info/channels-info.component'
const routes: Routes = [
  { path: 'userProfile', component: UserSProfileComponent},
  { path: '', component: UserSignupSigninComponent , pathMatch: 'full'},
  { path: 'welcomeHome', component: GroupsSidebarComponent},
  {path:'chat', component:ChatComponent},
  {path:'info', component:ChannelsInfoComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
