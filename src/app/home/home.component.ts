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
import {Book} from '../shared/book';
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
  BookList;
  count:any;
  temp:Book;
  pageOfItems:Array<any>;
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
      debounceTime(1000),
      distinctUntilChanged(),
      filter(term=>term.length>0),
    ).subscribe(searchterm=>{
      this.loading=false;
      this._searchEntries(searchterm);
    });
  }

  ngOnInit(): void {
    this.loading=false;
    this.BookList=[];
    this.temp=new Book();
    // this.myGroup['query'].valueChanges.subscribe(
    //   result => console.log(result)
    // );
    // console.log('preparing to load...')
    //     let node = document.createElement('script');
    //     node.src = 'https://www.google.com/books/jsapi.js';
    //     node.type = 'text/javascript';
    //     node.async = true;
    //     node.charset = 'utf-8';
    //     document.getElementsByTagName('head')[0].appendChild(node);
  }
  // search(data){
  //   console.log(data.valueChanges.subscribe());
  //   console.log(this.myGroup['query'].valueChanges.subscribe());
  // }
  values='';
  onKeyUp(event :any){
    this.values=event.target.value;
    console.log(this.values);
  }
  // searchEntries(term):Observable<any>{
  //   return this.http.get(baseURL+this.queryurl+term).pipe(
  //     map(response => {
  //       this.searchResults=response;
  //       //this.items=this.searchResults['items'];
  //       this.count=this.searchResults['totalItems'];
  //     })
  //   );
  // }
  entries(term):Observable<any>{
    return this.apiService.get(term).pipe(
      map(response=>{
        this.searchResults=response;
         setTimeout(()=>{
          this.items=this.searchResults['items'];
         },1000);
      })
    );
  }
  _searchEntries(term){
    this.entries(term).subscribe(response=>{
      //this.loading=true;
      //this.obj=response;
      this.loading=false;
      var i=0;
      this.BookList=[];
      setInterval(()=>{
        if(i<this.items.length){
          this.temp=new Book();
          this.temp.id=this.items[i].id;
          this.temp.url=this.items[i].selfLink;
          this.temp.title=this.items[i].volumeInfo.title;
          this.temp.subtitle=this.items[i].volumeInfo.subtitle;
          this.temp.author=this.items[i].volumeInfo.author;
          this.temp.publisher=this.items[i].volumeInfo.publisher;
          this.temp.publishedDate=this.items[i].volumeInfo.publishedDate;
          this.temp.description=this.items[i].volumeInfo.description;
          this.temp.pageCount=this.items[i].volumeInfo.pageCount;
          this.temp.maturity=this.items[i].volumeInfo.maturityRating;
          if(this.items[i].volumeInfo.imageLinks.thumbnail)
            this.temp.image=this.items[i].volumeInfo.imageLinks.thumbnail;
          this.BookList.push(this.temp);
          i++;
        }
      },200);
    },err=>{
      this.loading=false;
    })
  }
  pageIndex:number=0;
  pageSize:number=5;
  lowVal:number=0;
  highVal:number=5;
  getPaginatorData(event){
    console.log(event);
    if(event.pageIndex === this.pageIndex+1){
      this.lowVal=this.lowVal+this.pageSize;
      this.highVal=this.highVal+this.pageSize;
    }
    else if(event.pageIndex===this.pageIndex-1){
      this.lowVal-=this.pageSize;
      this.highVal-=this.pageSize;
    }
    this.pageIndex=event.pageIndex;
  }
  
}
