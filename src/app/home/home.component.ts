import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  filter
} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import {HttpClient} from '@angular/common/http';
import {baseURL} from '../shared/baseurl';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items:any;
  loading;
  myGroup;
  queryurl='?q=';
  searchResults:any;
  searchTerm=new Subject<String>();
  // =new FormGroup({
  //   query: new FormControl('')
  // });
  // query:FormControl= new FormControl();
  constructor(
    private apiService:ApiService,
    private formBuilder:FormBuilder,
    private http:HttpClient
  ) { 
    this.myGroup=this.formBuilder.group({
      query:''
    });
    this.searchTerm.pipe(
      map((e:any)=>e.target.value),
      debounceTime(400),
      distinctUntilChanged(),
      filter(term=>term.length>0),
    ).subscribe(searchterm=>{
      this.loading=true;
      this._searchEntries(searchterm);
    });
  }

  ngOnInit(): void {
    this.loading=false;
    // this.myGroup['query'].valueChanges.subscribe(
    //   result => console.log(result)
    // );
    console.log('preparing to load...')
        let node = document.createElement('script');
        node.src = 'https://www.google.com/books/jsapi.js';
        node.type = 'text/javascript';
        node.async = true;
        node.charset = 'utf-8';
        document.getElementsByTagName('head')[0].appendChild(node);
  }
  search(data){
    console.log(data.valueChanges.subscribe());
    console.log(this.myGroup['query'].valueChanges.subscribe());
  }
  values='';
  onKeyUp(event :any){
    this.values=event.target.value;
  }
  searchEntries(term):Observable<any>{
    return this.http.get(baseURL+this.queryurl+term).pipe(
      map(response => {
        this.searchResults=response;
        this.items=this.searchResults['items'];
        console.log(this.items);
      })
    )
  }
  _searchEntries(term){
    this.searchEntries(term).subscribe(response=>{
      this.loading=true;
    },err=>{
      this.loading=false;
    })
  }
  // initialize() {
  //   google.books.load();
  //   var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
  //   viewer.load('ISBN:0738531367');
  // }
}
