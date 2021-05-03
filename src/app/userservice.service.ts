import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  constructor(private http : HttpClient) { }

  getUserData(id) {
    return this.http.get(`/api/user/users/${id}`)
  }

public addGroup(payload){
  return this.http.post("/api/groups/addGroup",payload)
}

public getGroups() {
  return this.http.get('/api/groups/getAll') }
}







