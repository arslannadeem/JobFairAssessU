import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {

  questions : any;
  choices : any;
  data : any;

  constructor(private router:Router) { }

  ngOnInit() {
    this.questions = JSON.parse(localStorage.getItem("question"));
    this.choices = JSON.parse(localStorage.getItem("choice"));
    this.data = JSON.parse(localStorage.getItem("data"));
  }

  ResultsHighlights()
  {
    console.log("script");
    let i = 0;
    for(var j=0;j<this.data.length;j++)
    {
      var question = document.getElementById('+ (100+j) +');
      console.log(question)
      // for(var k=0;k<choice.length;k++)
      // {
      //   if(choice[k].Type)
      //   {
      //      console.log(k);
      //   }
      // }
    }
  }
}
