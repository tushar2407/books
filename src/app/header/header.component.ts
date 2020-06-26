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
    let myTag = this.el.nativeElement.querySelector("span");
    console.log(myTag.classlist);
    this.open.nativeElement.classlist.add('fade');
  }
  closeNav() {
    document.getElementById("myNav").style.width = "0%";
    let myTag = this.el.nativeElement.querySelector("span");
    // myTag.classlist.remove('fade');
    // console.log("asdas");
  }
}