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
  BookList:any[]=[];
  count:any;
  obj:any;
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
      debounceTime(1000),
      distinctUntilChanged(),
      filter(term=>term.length>0),
    ).subscribe(searchterm=>{
      this.loading=false;
      this._searchEntries(searchterm);
      //this.addBooks();
    });
  }

  ngOnInit(): void {
    this.loading=false;
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
  // addBooks(){
  //   //for(var i=0; i<this.items.length();i++){
  //     var i=0;  
  //     var temp=new Book();
  //     temp.id=this.items[i]['id'];
  //     temp.url=this.items[i]['selfLink'];
  //     temp.title=this.items[i]['volumeInfo']['title'];
  //     temp.subtitle=this.items[i]['volumeInfo']['subtitle'];
  //     temp.author=this.items[i]['volumeInfo']['author'];
  //     temp.publisher=this.items[i]['volumeInfo']['publisher'];
  //     temp.publishedDate=this.items[i]['volumeInfo']['publishedDate'];
  //     temp.description=this.items[i]['volumeInfo']['description'];
  //     temp.pageCount=this.items[i]['volumeInfo']['pageCount'];
  //     temp.maturity=this.items[i]['volumeInfo']['maturityRating'];
  //     this.BookList.push(temp);
  //   //}
  //     console.log(this.BookList[0]);
  // }
  entries(term):Observable<any>{
    return this.apiService.get(term).pipe(
      map(response=>{
        this.searchResults=response;
        this.items=this.searchResults['items'];
        // console.log(typeof response);
        // var temp=new Book();
        // var i=0;
        // console.log(typeof i);
        // temp.url=this.items[i]['selfLink'];
        // temp.title=this.items[i]['volumeInfo']['title'];
        // temp.subtitle=this.items[i]['volumeInfo']['subtitle'];
        // temp.author=this.items[i]['volumeInfo']['author'];
        // temp.publisher=this.items[i]['volumeInfo']['publisher'];
        // temp.publishedDate=this.items[i]['volumeInfo']['publishedDate'];
        // temp.description=this.items[i]['volumeInfo']['description'];
        // temp.pageCount=this.items[i]['volumeInfo']['pageCount'];
        // temp.maturity=this.items[i]['volumeInfo']['maturityRating'];
        // // console.log(temp);
        console.log("asdasd");
          this.BookList.push(this.items);
         this.BookList.push(4);
         console.log("asdas");
        // console.log(this.BookList[0]);
        // // this.searchResults['items'].forEach(function (o){
        // //   this.items.push(o);
        // // });
        // this.count=this.searchResults['totalItems'];
        // // console.log("asdasd");
        // // this.obj=this.searchResults['items'][1]['id'];
        //  console.log(typeof this.obj);
      })
    );
  }
  _searchEntries(term){
    this.entries(term).subscribe(response=>{
      //this.loading=true;
      //this.obj=response;
      this.loading=false;
    },err=>{
      this.loading=false;
    })
  }
  
}
