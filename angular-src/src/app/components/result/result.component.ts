import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {

  questions: any;
  choices: any;
  data: any;

  wrong_question = [];

  constructor(private router: Router,private quizService : QuizService) { }

  ngOnInit() {
    this.questions = JSON.parse(localStorage.getItem("question"));
    this.choices = JSON.parse(localStorage.getItem("choice"));
    this.data = JSON.parse(localStorage.getItem("data"));
  }

  ResultsHighlights() {
    
    for (var j = 0; j < this.data.length; j++) {
      var question = document.getElementById(String(100 + j));
      var choice = question.getElementsByTagName("div");

      let index = -1;
      for (var k = 0; k < choice.length; k++) {
        if (this.data[j].Choices[k].Status) {
          index = k;
          k = choice.length;
        }
      }

      if (this.choices[j] == index) {
        console.log("Question true");

        var statement = document.getElementById(String(100 + j));
        statement.getElementsByClassName(String(j))[index].setAttribute("class", "correct");
        index = -1;
      }
      else {
        console.log("Question false");
        console.log(this.questions[j]);

        if (index != -1) {

          this.wrong_question.push(this.questions[j]);

          var statement = document.getElementById(String(100 + j));
          statement.getElementsByClassName(String(j))[this.choices[j]].setAttribute("class", "wrong");

          var statement1 = document.getElementById(String(100 + j));
          statement1.getElementsByClassName(String(j))[index - 1].setAttribute("class", "correct_with_wrong");
          index = -1;
        }
      }
    }

    //console.log(this.wrong_question);

    var select_question = [];

    for(var i=0;i<this.wrong_question.length;i++)
    {
        select_question[i] = this.data[this.wrong_question[i]];
    }

    console.log(select_question);


  }


}