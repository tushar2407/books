import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute } from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ApiService} from '../services/api.service';
import {Book} from '../shared/book';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  book:Book;
  errMes:any;
  temp:Book;
  constructor(
    private route: ActivatedRoute,
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(switchMap((params: Params) => {return this.apiService.getBook(params['id']);} ))
    .subscribe(book => {  
          this.temp=new Book();    
          this.temp.id=book.id;
          this.temp.url=book.volumeInfo.canonicalVolumeLink;
          this.temp.title=book.volumeInfo.title;
          this.temp.subtitle=book.volumeInfo.subtitle;
          this.temp.author=book.volumeInfo.author;
          this.temp.publisher=book.volumeInfo.publisher;
          this.temp.publishedDate=book.volumeInfo.publishedDate;
          this.temp.description=book.volumeInfo.description;
          this.temp.description=unescape(decodeURIComponent(this.temp.description));
          this.temp.pageCount=book.volumeInfo.pageCount;
          this.temp.maturity=book.volumeInfo.maturityRating;
          this.temp.rating=book.volumeInfo.averageRating;
          if(book.volumeInfo.imageLinks.thumbnail)
            this.temp.image=book.volumeInfo.imageLinks.thumbnail;
          this.book=this.temp;
          // console.log(document.getElementsByClassName('desc'));
          // document.getElementById('desc').innerText=this.temp.description;
    }, 
    errmess => this.errMes=<any>errmess);
  }

}
