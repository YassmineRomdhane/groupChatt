import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import {UserserviceService} from '../userservice.service';
import { Router } from '@angular/router';



import * as moment from 'moment';
import { io } from 'socket.io-client';
const SOCKET_ENDPOINT = 'localhost:3000';
import { ChatService } from '../chat/chat.service';
@Component({
  selector: 'app-groups-sidebar',
  templateUrl: './groups-sidebar.component.html',
  styleUrls: ['./groups-sidebar.component.css']
})
export class GroupsSidebarComponent implements OnInit {

  constructor( private userService: UserserviceService, 
    private router:Router , private ChatService:ChatService) { }
  channels:any;
  userData: any;
  userId:any;
  imageUrl:any;
  userName: string;
  arr:any = [];
  socket;
  message = {
    messageBody:'',
    userId: localStorage.getItem('id'),
  };
  members:any=[]
  messageData:any=[]
  userMessages:any
  allMessages: any = [];
  sendedMessages: any = [];
  recievedMessages: any = [];
  isShowDivIf: boolean = false;
  ngOnInit(): void {
    this.setupSocketConnection();
    this.getAllMessages();
    this.userId = localStorage.getItem('id');
    this.userService.getUserData(this.userId).subscribe((data) => {
   this.userData = data;
      this.imageUrl = data['imageUrl']; 
     console.log('imaaaage',this.userData.imageUrl)
    })

  
    this.userService.getGroups().subscribe((data) => {
      this.channels = data;
      this.arr=data
  })
  $("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
  });

  
 

  }

  toggleDisplayDivIf() {
    this.isShowDivIf = !this.isShowDivIf;
  }
  logout(): void {
    // Logging out from user
      localStorage.removeItem('id');
      this.userId = '';
      Swal.fire('', 'You Are Logged Out!', 'success');
    this.router.navigate(['/']);
    }


    searchChannels(val) {
    //  console.log(val)
     this.channels=this.arr
    
      var newArray = [];
      this.channels.map((e) => {
        val = val.toUpperCase();
        var name = e.name.toUpperCase();
        if (name.includes(val)) {
          newArray.push(e);
        }
      });
      this.channels = newArray;
    }

    AddChannel(name, description) 
    {
      var channelsInfo = {
        name: name,
        description: description,
      };
      if (name === '') {
        alert('please type Name');
      } else {
        this.userService.addGroup(channelsInfo).subscribe((data) => {
          Swal.fire('added!', 'success');
          this.ngOnInit();
        });
      }
     
    }
    getAllMessages() {
      var room=localStorage.getItem('room')
      this.ChatService.getUserMessage(room).subscribe((data: any[]) => {
        this.allMessages = data;
        console.log('Hello', this.allMessages)
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
      })
       
  console.log("user", this.message.userId)
        for (var i = 0; i < this.allMessages.length; i++) {
          this.allMessages[i].createdAt = moment()
            .add(this.allMessages[i].createdAt)
            .calendar();
        }
      });
    }

    setRoom(room, roomId){
    var obj={
      roomId:roomId,
      userName:this.userData.userName,
      imageUrl:this.userData.imageUrl,
      groupName:room
      }
      console.log('ooobject', obj)
      this.ChatService.getMembers(obj).subscribe((data)=>
      {this.members=data})
      localStorage.setItem('room', room)
      // this.getAllMessages()
      this.ngOnInit()

      }
    setupSocketConnection() {
      this.socket = io(SOCKET_ENDPOINT);
      this.socket.on('message-broadcast', (data: string = this.allMessages) => {
        if (data) {
          this.getAllMessages();
          }
      });
    }
    SendMessage() {
      this.message["room"]=localStorage.getItem('room')
      this.socket.emit('message', this.message.messageBody);
     this.ChatService.sendMessage(this.message).subscribe((response) => {
        console.log("messages",response)
        this.getAllMessages();
        // this.ngOnInit()
        
      });
      this.message.messageBody = '';
    } 
    hideMessages() {
      document.getElementById('contt').style.display = 'none';
    }
    
    


}