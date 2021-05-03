import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserserviceService} from '../userservice.service'

@Component({
  selector: 'app-user-s-profile',
  templateUrl: './user-s-profile.component.html',
  styleUrls: ['./user-s-profile.component.css']
})
export class UserSProfileComponent implements OnInit {

  constructor(private http : HttpClient , private userService: UserserviceService) { }
  userData: any;
  userId:any;
  imageUrl:any;
  userName: string;
  ngOnInit(): void {
    this.userId = localStorage.getItem('id');
    this.userService.getUserData(this.userId).subscribe((data) => {
     this.userData = data;
      this.imageUrl = data['imageUrl'];
      console.log("helooow",this.userData)
    })
  }

}
