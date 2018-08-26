import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { AjaxService } from '../../Services/ajax.service';
3

@Component({
  selector: 'app-addblog',
  templateUrl: './addblog.component.html',
  styleUrls: ['./addblog.component.css']
})
export class AddblogComponent implements OnInit {
  frm:FormGroup;
  url:string;
  file:File;
  constructor(private sanitizer:DomSanitizer, private ajax:AjaxService) { 
    
  }

  ngOnInit() {
    this.url='';
    this.frm = new FormGroup({
      'name' : new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(100)]),
      'desc' : new FormControl(null,[Validators.required,Validators.minLength(5),Validators.maxLength(500)]),
      'image' : new FormControl(null)
    })
  }

  print(event){
    this.file=event.target.files[0];
     this.url = URL.createObjectURL(event.target.files[0]);
  }
  
  submitForm(){
    
    // console.log("FORMS VALUE IS",this.frm.value);
    var Obj:any={};
    Obj.name=this.frm.value.name;
    Obj.desc=this.frm.value.desc; 
    // Obj.image=this.file;
    console.log(this.file);
    Obj.file=this.file;
        console.log(Obj.file);
    console.log(Obj);
    Obj.userName=localStorage.getItem('user');
    Obj.blogId='';
    var adding = this.ajax.addBlog(Obj).subscribe(
      (data)=>{
        console.log("data is",data);
      },
      (err)=>{
        console.log("ERR is",err);
      },
      ()=>{
        console.log("Completed");
        adding.unsubscribe();
      }
    )
  }


  getSantizeUrl(url : string) {
  return this.sanitizer.bypassSecurityTrustUrl(url);
}

}
