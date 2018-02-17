import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username : String;
  password : String;
  type_name : any;
  usertype : any = [
    {name : "Select Type",value : 0},
    {name : "Admin",value : 1},
    {name : "Candidate",value : 2}
  ];

  constructor(
    private flashMessgae : FlashMessagesService,
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  Filter(value : any)
  {
    this.type_name = value;
  }

  onLoginSubmit()
  {
    const user = {
      username : this.username,
      password : this.password,
      type : this.type_name
    }

    this.authService.authenticationUser(user).subscribe(data => {
      if(data.success)
      {
        this.authService.storeUserData(data.token,data.users);
        localStorage.setItem("userType",user.type);
        this.flashMessgae.show("You are now logged In.",{cssClass : 'alert-success', timeout : 3000});    
        this.router.navigate(['/dashboard']);
      }
      else
      {
        this.flashMessgae.show(data.messages,{cssClass : 'alert-danger', timeout : 3000});    
        this.router.navigate(['/login']);
      }
    });
  }
}