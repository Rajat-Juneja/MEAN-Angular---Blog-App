import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
 flag:boolean;
  constructor() {
this.flag=true;
   }
   alterFlag(val){
    this.flag=val;
   }

  ngOnInit() {

  }

}
