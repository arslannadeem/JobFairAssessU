import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes} from '@angular/router';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import {AuthGuard} from './guards/auth.guard';


import {ValidateService} from './services/validate.service'
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthService} from './services/auth.service';
import {CourseService} from './services/course.service';
import {QuizService} from './services/quiz.service';
import {DataService} from './services/data.service';
import {ArticleService} from './services/article.service';
import {ModifyTopicService} from './services/modify-topic.service';
import {ModifyQuestionService} from './services/modify-question.service';

import { CoursesComponent } from './components/courses/courses.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';
import { ModifyTopicComponent } from './components/modify-topic/modify-topic.component';
import { ModifyQuestionComponent } from './components/modify-question/modify-question.component';

const appRoutes : Routes = [
  {path: '', component : HomeComponent},
  {path: 'register', component : RegisterComponent},
  {path: 'login', component : LoginComponent},
  {path: 'dashboard', component : DashboardComponent,canActivate:[AuthGuard]},
  {path: 'profile', component : ProfileComponent,canActivate:[AuthGuard]},
  {path: 'courses',component : CoursesComponent},
  {path: 'quiz',component : QuizComponent},
  {path: 'result',component : ResultComponent},
  {path: 'modify-topic',component : ModifyTopicComponent},
  {path: 'modify-question',component : ModifyQuestionComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    CoursesComponent,
    QuizComponent,
    ResultComponent,
    ModifyTopicComponent,
    ModifyQuestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ReactiveFormsModule,
    AngularMultiSelectModule
  ],
  providers: [ValidateService,AuthService,AuthGuard,CourseService,
              QuizService,DataService,ArticleService,ModifyTopicService,ModifyQuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }