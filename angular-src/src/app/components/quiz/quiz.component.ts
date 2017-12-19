import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

declare var $:any;

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  course : any;
  topic : any;
  
  index = 0;
  quiz_each_question : any;
  quiz_data : any ;

  question = [];
  choice = [];

  final_question = [];
  final_choice = [];
  
  constructor(private dataService : DataService ,  private quizService : QuizService, private router:Router) { }

  ngOnInit() {
    
    this.course = this.dataService.course;
    this.topic = this.dataService.topic;

    // --------------- Get Quiz Data ---------------
    
    this.quizService.getQuizData(this.dataService.course,this.dataService.topic).subscribe(list => {
      this.quiz_data = list.data; 
    });
  }

  SaveResult(question_id : number,choice_id : number)
  {
    this.question[this.index] = question_id;
    this.choice[this.index] = choice_id;

    this.index++;
  }

  CalculatingResult = function()
  {
    let count = 0;
    let last = 0;
    let k=0;
    let size = this.question.length;

    for(var i=0;i<size;i++)
    {
        for(var j=i+1;j<size;j++)
        {
            if(this.question[i]==this.question[j] && this.question[i]!= -1)
            {
                count++;
                last = j;
            }
        }
        if(count==0)
        {
          if(this.question[i]!=-1)
          {
            this.final_question[k] = this.question[i];
            this.final_choice[k] = this.choice[i];
            this.question[i]=-1;
          }
        }
        else
        {
          if(this.question[last]!=-1)
          {
            this.final_question[k]= this.question[last];
            this.final_choice[k]= this.choice[last];
            this.question[last]=-1;
          }
        }
        k++;
        last = 0;
        count = 0;
    }

    localStorage.setItem("question",JSON.stringify(this.final_question));
    localStorage.setItem("choice",JSON.stringify(this.final_choice));

    localStorage.setItem("data",JSON.stringify(this.quiz_data));

    this.router.navigate(['/result']);
  }

}