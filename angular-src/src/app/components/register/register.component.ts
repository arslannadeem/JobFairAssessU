import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FormsModule} from '@angular/forms';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : String;
  username : String;
  email : String;
  password : String;
  type : String;

  userType : any = [{name : "Select_One"},{name : "Candidate"},{name : "Employee"}]; 
  selectedType : any;

  constructor(
    private validateService : ValidateService,
    private flashMessgae : FlashMessagesService,
    private authService : AuthService,
    private router : Router) { }

  Set(value : any){
    this.selectedType=value;
    this.type=this.selectedType;
  }

  ngOnInit() {}

  onRegisterSubmit(form: NgForm){

    this.type = this.selectedType;
    const user = {
      name : this.name,
      email : this.email,
      username : this.username,
      password : this.password,
      type : this.type
    }



    // Required fields

    if(!this.validateService.validateRegister(user))
    {
      this.flashMessgae.show("Please fill in all fields",{cssClass : 'alert-danger', timeout : 3000});
      return false;
    }

    if(!this.validateService.validateEmail(user.email))
    {
      this.flashMessgae.show("Please Enter valid Email address",{cssClass : 'alert-danger', timeout : 3000});
      return false;
    }

    console.log(this.selectedType);

    //  Register User
    this.authService.registerUser(user).subscribe(data => {
        if(data.success)
        {
          this.flashMessgae.show("You are now registered and can log In.",{cssClass : 'alert-success', timeout : 3000});    
          this.router.navigate(['/login']);
        }
        else
        {
          this.flashMessgae.show("Something went Wrong",{cssClass : 'alert-danger', timeout : 3000});    
          this.router.navigate(['/register']);
        }
    });
  }
}