import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { io } from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';
import { ChatService } from './chat.service';
import {UserserviceService} from '../userservice.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  userData: any;
  userId:any;
  socket;
  message = {
    messageBody:'',
    userId: localStorage.getItem('id'),
    
  };
  messageData:any=[]
  userMessages:any
  allMessages: any = [];
  sendedMessages: any = [];
  recievedMessages: any = [];
  constructor(private ChatService:ChatService , private userService: UserserviceService) {}
  ngOnInit() {
    this.userId = localStorage.getItem('id');
    this.userService.getUserData(this.userId).subscribe((data) => {
     
      this.userData = data; })

    this.setupSocketConnection();
    this.getAllMessages();

   
  }
  getAllMessages() {
    var room=localStorage.getItem('room')
    this.ChatService.getUserMessage(room).subscribe((data: any[]) => {
      this.allMessages = data;
      console.log('Hello', this.allMessages)
      
      var messageData = {}
    this.allMessages.map((e)=>{
      console.log(
        "id",e['userId']
      )
      this.userService.getUserData(e['userId']).subscribe((data)=>{
     
        if(data){
          e["username"] = data["userName"]
          e["image"] = data["imageUrl"]
        }
       
       
      })
      console.log("messaaaage",this.messageData)
    })
     

      
      // console.log("user", this.message.userId)
      // for (var i = 0; i < this.allMessages.length; i++) {
      //   this.allMessages[i].createdAt = moment()
      //     .add(this.allMessages[i].createdAt)
      //     .calendar();
      // }
    });
  }
  

  // getUserMessages(){
  //   this.ChatService.getUserMessage(this.message.userId).subscribe((data: any[]) => {
  //     this.userMessages = data;
  //     console.log("user", this.message.userId)
  //   });
  // }
  setRoom(room){
    localStorage.setItem('room', room)
    this.getAllMessages();
    }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string = this.allMessages) => {
      if (data) {
        this.getAllMessages();
        // this.getUserMessages()
      }
    });
  }
  SendMessage() {
   this.ChatService.sendMessage(this.message).subscribe((response) => {
      console.log("messages",response)
      this.getAllMessages();
    });
    this.message.messageBody = '';
  } 
  hideMessages() {
    document.getElementById('contt').style.display = 'none';
  }

}
