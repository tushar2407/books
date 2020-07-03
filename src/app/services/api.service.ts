import { Injectable, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {baseURL} from '../shared/baseurl';
import {Book} from '../shared/book';
import {Password} from '../../../password';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  key=this.Password;
  constructor(
    private httpClient:HttpClient,
    @Inject('Password') public Password
  ) { }
  get(queryField: string):Observable<any>{
    return this.httpClient.get(
      baseURL+"?q="+queryField+"&maxResults=40&key="+this.key
    );
  }
}
