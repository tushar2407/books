import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {baseURL} from '../shared/baseurl';
import {Book} from '../shared/book';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  key="AIzaSyCS35jxrClTDoruG_cA5fw-ugD57HALmvo";
  constructor(
    private httpClient:HttpClient
  ) { }
  get(queryField: string):Observable<any>{
    return this.httpClient.get(
      baseURL+"?q="+queryField+"&maxResults=40&key="+this.key
    );
  }
}
