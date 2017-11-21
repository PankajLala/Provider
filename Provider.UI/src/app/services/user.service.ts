import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/Rx';
import { BaseService } from './base.service';
import { Router } from '@angular/router';

@Injectable()
export class UserService extends BaseService {
  private loggedIn: boolean;
  private path = 'token';

  constructor(private http: Http, private router: Router) {
    super();
    this.loggedIn = false;
  }

  login(userName, password) {
    const url = this.getApiUrl() + this.path;


  let params: any = {   
          grant_type: "password",  
          username: userName,  
          password: password,   
      };
    
      let body: string = this.encodeParams(params); 
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({ headers: headers });

    return this.http
      .post(url, body, options)
      .map(res => res.json())
      .map(res => {
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          this.loggedIn = true;
          return true;
        }
      })
      .catch(this.handleError);
  }

private encodeParams(params: any): string {  
  
        let body: string = "";  
        for (let key in params) {  
            if (body.length) {  
                body += "&";  
            }  
            body += key + "=";  
            body += encodeURIComponent(params[key]);  
        }  
  
        return body;  
    }
  logout() {
    sessionStorage.removeItem('access_token');
    this.loggedIn = false;
  }
  isLoggedIn() {
    this.loggedIn = sessionStorage.getItem('access_token') ? true : false;
    return this.loggedIn;
  }
}
