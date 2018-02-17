import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthConfig,tokenNotExpired} from 'angular2-jwt';
import "rxjs/add/operator/toPromise";

@Injectable()
export class CourseService {

  authToken : any;

  constructor(private http : Http) { }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    }

  //--------------------------------- Get Course Data -----------------------  ok

  getCoursesData()
  {
    console.log('Course Service')
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/course/getAllCourses',{headers : headers})
    .map(res => {
      return res.json();
    })
  }

  //--------------------------------- Add Course Data -----------------------

  addCourseData()
  {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    console.log("service")
    return this.http.post('http://localhost:3000/course/newCourse',{headers : headers})
    .map(res => {
      return res.json();
    })
  }

  addTopicsData(list : any)
  {
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    console.log("service")
    return this.http.post('http://localhost:3000/course/newTopics',list,{headers : headers})
    .map(res => {
      return res.json();
    })
  }
}