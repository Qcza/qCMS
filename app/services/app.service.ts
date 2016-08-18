import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Template } from '../models/template';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {
  constructor (private http: Http) {  }

  //Templates services
  private templatesUrl = 'http://localhost:3000/templates';
  getTemplates (): Observable<any> {
    return this.http.get(this.templatesUrl).map(this.extractData).catch(this.handleError);
  }

  pushTemplate (template:Template): Observable<any> {
    let body = JSON.stringify(template);
    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.templatesUrl, body, options).map(this.extractData).catch(this.handleError);
  }

  //helpers
  private extractData(res:Response) {
    let body = res.json();
    return body || {  };
  }
  private handleError (error:any) {
    let errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.message}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}