import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {
  frm:FormGroup;
  constructor() { }

  ngOnInit() {
    this.frm = new FormGroup({
      // 'username' : new FormControl(null,[Validators.req])
    })
  }
  
  submitForm(){
    console.log("FORMS VALUE IS",this.frm.value); 
  }

}
