import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @ViewChild('open') open: ElementRef;
  constructor(
    private el:ElementRef
  ) { }
  ngOnInit(): void {
  }
  openNav() {
    document.getElementById("myNav").style.width = "100%";
    console.log("asdas");
  }
  closeNav() {
    document.getElementById("myNav").style.width = "0%";
  }
}