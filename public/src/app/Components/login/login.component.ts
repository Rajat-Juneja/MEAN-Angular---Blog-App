import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import {LoginUser} from '../../Models/LoginUser';
import {AjaxService} from '../../Services/ajax.service';
import {Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../../node_modules/font-awesome/css/font-awesome.min.css']
})
export class LoginComponent implements OnInit {
  frm: FormGroup; 
  show:boolean;
  Obj:LoginUser;
  email:String;
  name:String;
  error:String;
  constructor(private service:AjaxService,private router:Router,private route:ActivatedRoute) {
    this.show=false;
    this.email=this.name=undefined;
    this.error='';
  }

  ngOnInit() {
    setTimeout(()=>{
      this.service.flag='';}, 2500);
  this.frm = new FormGroup ({
    'email':new FormControl(null,[Validators.required,Validators.email,Validators.pattern("^([A-Z|a-z|0-9](\.|_){0,1})+[A-Z|a-z|0-9]\@([A-Z|a-z|0-9])+((\.){0,1}[A-Z|a-z|0-9]){2}\.[a-z]{2,3}$")]),
    'password': new FormControl(null,[Validators.required])
  })
  }

  submitForm(){
    // console.log(this.frm.value);
    this.Obj=this.frm.value;
    var logging = this.service.getUser(this.Obj).subscribe(
      (data)=>{
        if(data.success){
        var obj=data.data;
        this.name=obj.name;
        this.email= obj.email;
        localStorage.setItem('token',data.token);
        localStorage.setItem('user', obj.name);
      }
      else{
        this.error=data.message;
        setTimeout(()=>{this.error=''}, 1500)
        logging.unsubscribe();
      }
      },
      (err)=>{
        console.log("Error",err);
      },
      ()=>{
        console.log("Completed");
        logging.unsubscribe();
        // this.router.navigate(['/start/'+this.email]);
        this.router.navigate(['/start'],{queryParams:{'email':this.email,'name':this.name}});
      }
    )
  }

  openReg(){
    this.router.navigate(['/register']);
  }

  showPass(val){
    this.show=val;
  }
}
