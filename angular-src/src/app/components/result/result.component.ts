import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {

  questions: any;
  choices: any;
  data: any;

  constructor(private router: Router) { }

  ngOnInit() {
    this.questions = JSON.parse(localStorage.getItem("question"));
    this.choices = JSON.parse(localStorage.getItem("choice"));
    this.data = JSON.parse(localStorage.getItem("data"));
  }

  ResultsHighlights() {
     console.log("script");
    let i = 0;
    for (var j = 0; j < this.data.length; j++) {
      var question = document.getElementById(String(100+j));
      var choice = question.getElementsByTagName("div");
      
      let index = 0;
      for(var k=0;k<choice.length;k++)
      {
        if(this.data[j].Choices[k].Status)
        {
          index = k;
          k=choice.length;
        }
      }

        if(this.choices[j] == index)
        {
          //choice[k].getAttribute("id")
          console.log("Question true");
          index=0;
          var statement = document.getElementById(String(100+j));
          statement.getElementsByClassName(String(j))[index].setAttribute("class", "correct");
        }
        else
        {
          console.log("Question false");
          var statement = document.getElementById(String(100+j));
          statement.getElementsByClassName(String(j))[this.choices[j]].setAttribute("class", "wrong");
        
          var statement1 = document.getElementById(String(100+j));
          statement1.getElementsByClassName(String(j))[index].setAttribute("class", "correct_with_wrong");
        }
      }
    }
}