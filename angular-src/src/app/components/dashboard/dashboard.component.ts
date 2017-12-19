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

  course_List : any;
  topic_List : any;
  selected_course : any;
  selected_topic : any;

  constructor(private data: DataService,private courseService : CourseService, private router:Router, private flashMessgae : FlashMessagesService) { }

  ngOnInit() {
    //  Register User
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
      // this.course_List.forEach(function (course) {
      // });
    },
    err => {
      return false;
    });
  }

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

  onSelectTopic(){
    console.log(this.selected_topic)
  }

  StartQuiz()
  {
      this.data.passValues(this.selected_course,this.selected_topic);
      this.router.navigate(['/quiz']);
  }
}