import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup-signin',
  templateUrl: './user-signup-signin.component.html',
  styleUrls: ['./user-signup-signin.component.css']
})
export class UserSignupSigninComponent implements OnInit {
  constructor(private http: HttpClient,
     private router:Router
     ) { }
  userSignup: boolean = false;
  container: any;
  imageUrl:string

  ngOnInit(): void {
  }
  imgUpload(img) {
    
    var formData = new FormData();
    formData.append('img', img.target.files[0]);
    this.http
      .post('http://localhost:3000/upload', formData)
      .subscribe((resp) => {
        this.imageUrl = resp['msg'].url;
        console.log("helll",this.imageUrl)
     
      });}


  signupUser() {
    this.userSignup = true;
    document.querySelector('.container').classList.add('sign-up-mode');
  }

  signin() {
    this.userSignup = false;
    document.querySelector('.container').classList.remove('sign-up-mode');
  } 
 
  
  register(
    userName,
    email,
    password,
    repeatedPassword,
    imageUrl,
    
  ) { 
    if (!imageUrl) {
      imageUrl =
        'https://clipartart.com/images/default-profile-picture-clipart-3.jpg';
    }
    if (
      !userName ||
      !email ||
      !password ||
      !repeatedPassword 
       ) 
       {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'please fill all the fields',
      });
    } else if (password.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'your password must be at least 8 characters',
      });
    } else if (password !== repeatedPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'make sure to confirm your password correctly',
      });
    } else {
      this.http
        .post(
          'http://localhost:3000/api/user/signup',
          {
            userName: userName,
            email: email,
            password: password,
            repeatedPassword:repeatedPassword,
            imageUrl: imageUrl,
          },
          { responseType: 'json' }
        )
        .subscribe((data) => {
          console.log("ddddddd",data)
          if (data['err']) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: data['err'],
            });
          } else {
            localStorage.setItem('token', data['token']);
            Swal.fire(
              'Singup Complete!',
              'success'
            );
          }
        });
      }
  }

   login(mail,signinPassword){
     this.http.post('http://localhost:3000/api/user/login',
     {
       email: mail,
       password: signinPassword,
     },
     { responseType: 'json' }
   )
   .subscribe((data) => {
     console.log("signin", data)
     if (data['err']) {
       Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: data['err'],
       });
     }
     else{
      // localStorage.setItem('token', data['token']);
      localStorage.setItem('id', data['id']);
      this.router.navigateByUrl('/welcomeHome');
      // this.router.navigateByUrl('/userProfile');

      Swal.fire(
        data['greet'] + ' ' + data['name'],
        data['success'],
        'success'
      );
     }
    }) }
} 