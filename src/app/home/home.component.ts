import { Component, OnInit } from '@angular/core';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items:any;
  loading;
  query:FormControl= new FormControl();
  constructor(
    private apiService:ApiService
  ) { }

  ngOnInit(): void {
    this.loading=false;
    this.query.valueChanges.subscribe(
      result => console.log(result)
    );
  }

}
