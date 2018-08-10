import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../../node_modules/font-awesome/css/font-awesome.min.css']
})
export class LoginComponent implements OnInit {
  frm: FormGroup; 
  show:boolean
  constructor() {
    this.show=false;
   }

  ngOnInit() {
  this.frm = new FormGroup ({
    'email':new FormControl(null,[Validators.required,Validators.email,Validators.pattern("^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$")]),
    'password': new FormControl(null,[Validators.required])
  })
  }

  submitForm(){
    console.log(this.frm.value);
  }

  showPass(val){
    this.show=val;
  }
}
