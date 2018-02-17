import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modify-question',
  templateUrl: './modify-question.component.html',
  styleUrls: ['./modify-question.component.css']
})
export class ModifyQuestionComponent implements OnInit {

   strin = "<h2>Class Diagram</h2><p>UML structural diagrams are categorized as follows: class diagram, object diagram, component diagram, and deployment diagram.</p>"
  + "<h2>Object Diagram</h2><p>A class diagram models the static view of a system. It comprises of the classes, interfaces, and collaborations of a system; and the relationships between them.</p><p>Let us consider a simplified Banking System.</p><p>A bank has many branches. In each"
  + "zone, one branch is designated as the zonal head office that supervises the other branches in that zone. Each branch can have multiple accounts and loans. An account may be either a savings account or a current account. A customer may open both a savings account and a current account. However, a customer must not have more than one savings account or current account. A customer may also procure loans from the bank.</p><p>The following figure shows the corresponding class diagram.</p><img src = https://www.tutorialspoint.com/object_oriented_analysis_design/images/class_diagram_banking_system.jpg alt = Class Diagram of Banking System><p>Bank, Branch, Account, Savings Account, Current Account, Loan, and Customer.</p><p>From the class Account, two classes have inherited, namely, Savings Account and Current Account.</p>"
  + "<h2>Component Diagram</h2><p>An object diagram models a group of objects and their links at a point of time. It shows the instances of the"
  + "things in a class diagram. Object diagram is the static part of an interaction diagram.</p><p>Example − The following figure shows an object diagram of a portion of the class diagram of the Banking System.</p><img src = https://www.tutorialspoint.com/object_oriented_analysis_design/images/object_diagram_banking_system.jpg alt = Object Diagram of Banking System>"
  + "<h2>Deployment Diagram</h2><p>Component diagrams show the organization and dependencies among a group of components.</p><p>Component diagrams comprise of −</p><p>Component diagrams are used for −</p><p>Example</p><p>The following figure shows a component diagram to model a system’s source code that is developed using C++. It shows four source code files, namely, myheader.h, otherheader.h, priority.cpp, and other.cpp. Two versions of myheader.h are shown, tracing from the recent version to its ancestor. The file priority.cpp has compilation dependency on other.cpp. The file other.cpp has compilation dependency on otherheader.h.</p><img src = https://www.tutorialspoint.com/object_oriented_analysis_design/images/component_diagram.jpg alt = Component Diagram>";
  topics = [];
  constructor() { }

  ngOnInit() {
    this.Initailization();
    document.write(this.strin);
  }

  Initailization()
  {
      this.topics = JSON.parse(localStorage.getItem("Admin_Topics"));
      if(this.topics)
      {}
  }

  // AddTopics2(values: any) {
  //   this.modifyTopicService.addTopics_with_subTopics2(values).subscribe(data => {
  //     if (data.success) {
  //       this.second_website = data.data;
  //       this.SaveDataInJason2();
  //       this.flashMessgae.show("Topcis Shows", { cssClass: 'alert-success', timeout: 3000 });
  //     }
  //     else {
  //       this.flashMessgae.show("Something went Wrong", { cssClass: 'alert-danger', timeout: 3000 });
  //     }
  //   });
  // }
}
