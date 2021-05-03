import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiURL: string = 'http://localhost:3000/api/';
  constructor(private httpClient: HttpClient) {}

  public getAllMessages() {
    return this.httpClient.get(this.apiURL + 'messages/getMessages');
  }
  public sendMessage(payload){
    return this.httpClient.post("/api/messages/sendMessage",payload)}
 
   public getUserMessage(room) {
    return this.httpClient.get(`/api/messages/getMessages/${room}`)
    
  }

  public getMembers(obj){
    return this.httpClient.post("/api/members/getAll",obj)}


  
  // console.log("id",userId)
}
