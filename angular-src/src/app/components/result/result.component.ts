import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  constructor(private router: Router,private quizService : QuizService, private flashMessgae: FlashMessagesService) { }

  final_list_of_articles = [];
  View_result_array = [];
  view = false;

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

    var select_question = [];

    for(var i=0;i<this.wrong_question.length;i++)
    {
        select_question[i] = this.data[this.wrong_question[i]];
    }

    if(this.wrong_question.length>0)
    {
      this.quizService.getArticleByWrongQuestion(select_question).subscribe(data => {
        if (data.success) {

          var list = data.articles;

          // ----- if duplicate articles then remove it --------

          for(var i=0;i<list.length-1;i++)
          {
            for(var j=i+1;j<list.length;j++)
            {
              if(list[j]._id!=-1 && list[i]._id!=-1 && list[i]._id==list[j]._id)
              {
                list[j]._id=-1;
              }
            }
          }

          // ----------- save it other array -------
          
          for(var i=0,j=0;i<list.length-1;i++)
          {
            if(list[i]._id!=-1)
            {
              this.final_list_of_articles[j]=list[i];
              j++;
            }
          }

          console.log("articles : ",this.final_list_of_articles);

          this.flashMessgae.show("Topcis Shows", { cssClass: 'alert-success', timeout: 3000 });
        }
        else {
          this.flashMessgae.show("Something went Wrong", { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    }
  }

  ShowArticles()
  {
    console.log("call");
      this.view = true;

      // ----- if duplicate articles then remove it --------

      var temp_question_no = [];
      var temp_list = this.wrong_question;
      
      for(var i=0;i<temp_list.length-1;i++)
      {
        for(var j=i+1;j<temp_list.length;j++)
        {
          if(temp_list[j]!=-1 && temp_list[i]!=-1 && temp_list[i]==temp_list[j])
          {
            temp_list[j]=-1;
          }
        }
      }

      // ----------- save it other array -------
          
      for(var i=0,j=0;i<temp_list.length-1;i++)
      {
        if(temp_list[i]!=-1)
        {
          temp_question_no[j]=temp_list[i];
          j++;
        }
      }

      console.log("question number list : " , temp_question_no);
      //---------------------

      for(var i=0,k=0;i<temp_question_no.length;i++)
      {
          for(var j=0;j<this.final_list_of_articles.length;j++)
          {
            if(this.data[temp_question_no[i]].Sub_Topic_Name == this.final_list_of_articles[j].Sub_Topic_Name
            && this.data[temp_question_no[i]].Topic_Name == this.final_list_of_articles[j].Topic_Name)
            {
              this.View_result_array[k]={"Question":this.data[this.questions[i]].Description,"Description": String(this.final_list_of_articles[j].Description) };
              k++;
            }
          }
      }

      console.log(this.View_result_array);
  }

}