import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {baseURL} from '../shared/baseurl';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  key="";
  constructor(
    private httpClient:HttpClient
  ) { }
  get(queryField: string){
    return this.httpClient.get(
      baseURL+"?q=${queryField}&maxResults=40&keyes&key=${this.key}"
    );
  }
}
