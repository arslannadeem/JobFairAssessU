import { Injectable } from '@angular/core';
import {Http,Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AuthConfig,tokenNotExpired} from 'angular2-jwt';
import "rxjs/add/operator/toPromise";

@Injectable()
export class ModifyTopicService {

  constructor(private http : Http) { }

  authToken : any;

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    }
  
    addTopics_with_subTopics(value : any)
    {
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-Type','application/json');
      console.log("service")
      return this.http.get('http://localhost:3000/modify-topic/Add_Topics',{headers : headers})
      .map(res => {
        
        console.log("Topics service");

        return res.json();
      })
    }

    addTopics_with_subTopics2(value : any)
    {
      let headers = new Headers();
      this.loadToken();
      headers.append('Authorization',this.authToken);
      headers.append('Content-Type','application/json');
      console.log("service")
      return this.http.get('http://localhost:3000/modify-topic/Add_Topics2',{headers : headers})
      .map(res => {
        
        console.log("Topics service");

        return res.json();
      })
    }

}