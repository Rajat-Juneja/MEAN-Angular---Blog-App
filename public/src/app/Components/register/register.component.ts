import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../../../node_modules/font-awesome/css/font-awesome.min.css']
})
export class RegisterComponent implements OnInit {
  frm:FormGroup;
  show:boolean;
  constructor() {
    this.show=false;
   }

  ngOnInit() {
    this.frm = new FormGroup({
      'name': new FormControl(null,[Validators.required,Validators.pattern("^[a-zA-Z\\s]*$"),Validators.minLength(3),Validators.maxLength(50)]),
      'email': new FormControl(null,[Validators.required,Validators.email,Validators.pattern("^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$")]),
      'mobile': new FormControl(null,[Validators.required,Validators.pattern("^[0-9]{10}$")]),
      'password': new FormControl(null,[Validators.required,Validators.minLength(6),Validators.maxLength(15)])
    })
  }

  submitForm(){
    console.log(this.frm.value);
  }

  showPass(val){
    this.show=val;
  }

}
