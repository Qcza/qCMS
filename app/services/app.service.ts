import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Template } from '../models/template';
import { Doc } from '../models/document';
import { User } from '../models/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {
  constructor (private http: Http) {  }

  private domain = 'http://localhost:3000';

  // Templates services
  private templatesUrl = this.domain + '/templates';
  getTemplates (): Observable<any> {
    return this.http.get(this.templatesUrl).map(this.extractData).catch(this.handleError);
  }

  getTemplate (id:string): Observable<any> {
    return this.http.get(this.templatesUrl + '/' +id).map(this.extractData).catch(this.handleError);
  }

  postTemplate (template:Template): Observable<any> {
    let body = JSON.stringify(template);
    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.templatesUrl, body, options).map(this.extractData).catch(this.handleError);
  }

  putTemplate (template:Template): Observable<any> {
    let body = JSON.stringify(template);
    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.templatesUrl+'/'+template._id, body, options).map(this.extractData).catch(this.handleError);
  }

  deleteTemplate (template:Template): Observable<any> {
    return this.http.delete(this.templatesUrl+'/'+template._id).map(this.extractData).catch(this.handleError);
  }

  // Documents services
  private documentsUrl = this.domain + '/documents';
  postDocument (document:Doc): Observable<any> {
    let body = JSON.stringify(document);
    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.documentsUrl, body, options).map(this.extractData).catch(this.handleError);
  }

  getDocuments (): Observable<any> {
    return this.http.get(this.documentsUrl).map(this.extractData).catch(this.handleError);
  }

  putDocument (document:Doc): Observable<any> {
    let body = JSON.stringify(document);
    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.documentsUrl+'/'+document._id, body, options).map(this.extractData).catch(this.handleError);
  }

  deleteDocument (document:Doc): Observable<any> {
    return this.http.delete(this.documentsUrl+'/'+document._id).map(this.extractData).catch(this.handleError);
  }

  // Users services
  private usersUrl = this.domain + '/users';
  postUsers (user:User): Observable<any> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.usersUrl, body, options).map(this.extractData).catch(this.handleError);
  }

  getUsers (): Observable<any> {
    return this.http.get(this.usersUrl).map(this.extractData).catch(this.handleError);
  }

  putUser (user:User): Observable<any> {
    let body = JSON.stringify(user);
    let headers = new Headers({'Content-type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.usersUrl+'/'+user._id, body, options).map(this.extractData).catch(this.handleError);
  }

  deleteUser (user:User): Observable<any> {
    return this.http.delete(this.usersUrl+'/'+user._id).map(this.extractData).catch(this.handleError);
  }

  // Helpers services
  private collectionsUrl = this.domain + '/helpers/collections';
  getCollections (): Observable<any> {
    return this.http.get(this.collectionsUrl).map(this.extractData).catch(this.handleError);
  }

  private elementsUrl = this.domain + '/helpers/elements';
  getElements (): Observable<any> {
    return this.http.get(this.elementsUrl).map(this.extractData).catch(this.handleError);
  }

  private rolesUrl = this.domain + '/helpers/roles';
  getRoles (): Observable<any> {
    return this.http.get(this.rolesUrl).map(this.extractData).catch(this.handleError);
  }

  // Helpers
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