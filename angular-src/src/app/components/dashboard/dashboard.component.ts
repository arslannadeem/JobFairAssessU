import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  course_List = [];
  topic_List : any;
  selected_course : any;
  selected_topic : any;
  usertype = null;

  constructor(private data: DataService,private courseService : CourseService, private router:Router, private flashMessgae : FlashMessagesService) { }

  ngOnInit() {
    var check = localStorage.getItem("userType");
      if( check == "Admin")
      {
        this.usertype = false;
      }
      else
      {
        this.usertype = true;
      }

      console.log(check);
      //console.log(localStorage.getItem("UserType"));

  // --------------- Add Courses Data ---------------

  //   this.courseService.addCourseData().subscribe(data => {
  //     if(data.success)
  //     {
  //       this.flashMessgae.show("Your Course is registered and can log In.",{cssClass : 'alert-success', timeout : 3000});    
  //       //this.router.navigate(['/login']);
  //     }
  //     else
  //     {
  //       this.flashMessgae.show("Something went Wrong",{cssClass : 'alert-danger', timeout : 3000});    
  //       //this.router.navigate(['/register']);
  //     }
  // });

  // --------------- Get Courses Data ---------------

    this.courseService.getCoursesData().subscribe(list => {
      this.course_List = list.data;
      console.log(this.course_List);
    },
    err => {
      return false;
    });
  }

  // ---------------- On Select Course --------------

  onSelectCourse() { 
    console.log(this.selected_course)
    for(var i =0 ;i<this.course_List.length;i++)
    {
        if(this.course_List[i].Course_Name==this.selected_course)
        {
          this.topic_List = this.course_List[i].Topics;
        }
    }
  }

  // ---------------- On Select Topic ---------------

  onSelectTopic(){
    console.log(this.selected_topic)
  }

  // ------------------- Start Quiz -----------------

  StartQuiz()
  {
      this.data.passValues(this.selected_course,this.selected_topic);
      this.router.navigate(['/quiz']);
  }

  // ----------------- For Admin Panel --------------
  
  on_Modify(event) {
    if(event.target.id == "modify_question")
    {
      this.router.navigate(['/modify-question']);
    }
    else if(event.target.id == "modify_topic")
    {
      this.router.navigate(['/modify-topic']);
    }
    else if(event.target.id == "modify_course")
    {
      //this.router.navigate(['/modify-course']);
    }
  }
  
}