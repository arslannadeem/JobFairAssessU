import { Component, OnInit } from '@angular/core';
import { ModifyTopicService } from '../../services/modify-topic.service';
import { CourseService } from '../../services/course.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-modify-topic',
  templateUrl: './modify-topic.component.html',
  styleUrls: ['./modify-topic.component.css']
})
export class ModifyTopicComponent implements OnInit {

  count = 0;
  count2 = 0;
  ids: [number];
  option: any;
  choiceOptions: any = [
    { name: "Select One Action", value: 0 },
    { name: "Add Topic", value: 1 },
    { name: "Edit Topic", value: 2 }];

  course_name = "OOP";

  topics = [];
  second_website = [];
  second_website2 = [];
  array_of_topic = [];
  array_of_topic2 = [];

  course: any;

  constructor(
    private courseService: CourseService,private modifyTopicService: ModifyTopicService, private router: Router, private flashMessgae: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  Filter(value: any) {
    if (value == "Add Topic") {
      this.option = 0;
      this.AddTopics(this.course_name);
      this.AddTopics2(this.course_name);
    }
    else if (value == "Edit Topics") {
      this.option = 1;
    }
    else {
      this.option = -1;
    }
  }

  Filter_Selection(value: any) {
    if (this.count % 2 == 0) {
      if (document.getElementById(value).classList.contains("select")) {
        document.getElementById(value).classList.remove("select");
      }
      else {
        document.getElementById(value).classList.add("select");
      }
    }
    this.count++;
  }

  Filter_Selection2(value: any) {
    var che = 100 + value;
    if (this.count2 % 2 == 0) {
      if (document.getElementById(che).classList.contains("select")) {
        document.getElementById(che).classList.remove("select");
      }
      else {
        document.getElementById(che).classList.add("select");
      }
    }
    this.count2++;
  }

  AddTopics(values: any) {
    this.modifyTopicService.addTopics_with_subTopics(values).subscribe(data => {
      if (data.success) {
        this.topics = data.data;
        this.SaveDataInJason();
        this.flashMessgae.show("Topcis Shows", { cssClass: 'alert-success', timeout: 3000 });
      }
      else {
        this.flashMessgae.show("Something went Wrong", { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  AddTopics2(values: any) {
    this.modifyTopicService.addTopics_with_subTopics2(values).subscribe(data => {
      if (data.success) {
        this.second_website = data.data;
        this.SaveDataInJason2();
        this.flashMessgae.show("Topcis Shows", { cssClass: 'alert-success', timeout: 3000 });
      }
      else {
        this.flashMessgae.show("Something went Wrong", { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
  }

  SaveDataInJason() {
    for (var i = 0; i < this.topics.length; i++) {
      var name: String;
      var data = [];
      if (i % 2 == 0) {
        name = this.topics[i];
      }
      else {
        var k = 0;
        for (var j = 0; j < this.topics[i].length; j++) {
          if (name == this.topics[i][j + 2]) {
            var topics_data = { sub: { link: String, sub_heading: String, head: String } };
            topics_data.sub.head = this.topics[i][j + 2];
            topics_data.sub.sub_heading = this.topics[i][j + 1];
            topics_data.sub.link = this.topics[i][j];
            data[k] = topics_data;
          }
          j = j + 2;
          k++;
        }
        k = 0;
        this.array_of_topic[i] = { name, data };
        name = null;
        data = [];
      }
    }

    var j = 1;
    var k = 0;
    for (var i = 0; i < (this.array_of_topic.length / 2) - 2; i++) {
      if (this.array_of_topic[j] != undefined) {
        this.array_of_topic2[k] = this.array_of_topic[j];
        k++;
      }
      j = j + 1;
    }
  }

  SaveDataInJason2() {
    var data = [];
    var l = 0;
    for (var i = 0; i < this.second_website.length; i++) {
      var name: String;
      var data1 = [];
      var data2 = [];

      for (var j = 0; j < this.second_website[i].length; j++) {
        data1[j] = this.second_website[i][j];
      }
      for (var k = 0; k < this.second_website[i + 1].length; k++) {
        data2[k] = this.second_website[i + 1][k];
      }
      name = this.second_website[i + 2];

      var topics = { name: String, sub: { link: [String], sub_heading: [String] } };
      topics.name = this.second_website[i + 2];

      topics.sub.link = data2;
      topics.sub.sub_heading = data1;

      data[l] = topics;
      data1 = [];
      data2 = [];

      i = i + 2;
      l++;
    }
    this.second_website2 = data;
  }

  AddTopic() {
    var data_list = [];
    var ids = [];
    var div = document.getElementsByClassName("select");
    if (div) {
      for (var i = 0; i < div.length; i++) {
        ids[i] = div[i].getAttribute("id");

        if (ids[i] < 100 && ids[i] != undefined) {
          //--------- JavaTpoint --------
          var name = this.array_of_topic2[ids[i]].name;
          var list = this.array_of_topic2[ids[i]].data;
          data_list[i] = { name, list };
        }
        else {
          //--------- Tutorial Point -------
            var name = this.second_website2[ids[i]-100].name;
            var list = this.second_website2[ids[i]-100].sub;
            data_list[i] = { name, list };
        }

      }
      console.log(data_list);
      localStorage.setItem("Admin_Topics",JSON.stringify(data_list));

      this.router.navigate(['/dashboard']);
      // this.courseService.addTopicsData(data_list).subscribe(data=>{
      //     if(data.success)
      //         {
      //           this.flashMessgae.show("Your Topics are Add",{cssClass : 'alert-success', timeout : 2000});    
      //           //this.router.navigate(['/login']);
      //         }
      //         else
      //         {
      //           this.flashMessgae.show("Something went Wrong",{cssClass : 'alert-danger', timeout : 2000});    
      //           //this.router.navigate(['/register']);
      //         }
      //   });
    }
    else {
      this.flashMessgae.show("Wrong,Must be Selected", { cssClass: 'alert-danger', timeout: 3000 });
    }
  }
}