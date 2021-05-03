import { Component, OnInit } from '@angular/core';
import {UserserviceService} from '../userservice.service';
import { ChatService } from '../chat/chat.service';
@Component({
  selector: 'app-channels-info',
  templateUrl: './channels-info.component.html',
  styleUrls: ['./channels-info.component.css']
})
export class ChannelsInfoComponent implements OnInit {

  constructor(private userService: UserserviceService, 
      private ChatService:ChatService) { }
      channels:any;
      userData: any;
      members:any=[]
      userId:any;
  ngOnInit(): void {
    this.userService.getGroups().subscribe((data) => {
      this.channels = data;
      
  })

  this.userId = localStorage.getItem('id');
  this.userService.getUserData(this.userId).subscribe((data) => {
 this.userData = data;
   
  })
  }

  setRoom(room, roomId){
    var obj={
      roomId:roomId,
      userName:this.userData.userName,
      imageUrl:this.userData.imageUrl
      }
      this.ChatService.getMembers(obj).subscribe((data)=>
      {this.members=data})
      localStorage.setItem('room', room)
      // this.getAllMessages()
      this.ngOnInit()
      
      
      }

}
