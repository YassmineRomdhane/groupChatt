import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserSignupSigninComponent } from './user-signup-signin/user-signup-signin.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { GroupsSidebarComponent } from './groups-sidebar/groups-sidebar.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms'; 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AddChannelsComponent } from './add-channels/add-channels.component';
import { ChannelsInfoComponent } from './channels-info/channels-info.component';
// import { UserSProfileComponent } from './user-s-profile/user-s-profile.component';
@NgModule({
  declarations: [
    AppComponent,
    UserSignupSigninComponent,
    // UserProfileComponent,
    GroupsSidebarComponent,
    ChatComponent,
    AddChannelsComponent,
    ChannelsInfoComponent,
    // UserSProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
