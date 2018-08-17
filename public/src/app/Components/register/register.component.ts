import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {User} from '../../Models/User';
import {AjaxService} from '../../Services/ajax.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css','../../../../node_modules/font-awesome/css/font-awesome.min.css']
})
export class RegisterComponent implements OnInit {
  frm:FormGroup;
  done:boolean;
  Obj:User;
  show:Boolean;

  constructor(private service:AjaxService,private router:Router) {
    this.done=this.show=false;
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
    console.log("Submit Called",this.frm.value);
    this.Obj=this.frm.value;
    var posting = this.service.addUser(this.Obj).subscribe(
      (data)=>{
      if(data.success==true){
        this.done=true;
        this.service.flag = "Successfully Registered";
      }
    },
      (err)=>{
        console.log("ERR",err)
      },
      ()=>{
      console.log("COMPLETED");
      posting.unsubscribe();
      if(this.done){
        this.router.navigate(['/'])
      }
      
    })
  }

  openReg(){
    this.router.navigate(['/']);
  }

  showPass(val){
    this.show=val;
  }

}
