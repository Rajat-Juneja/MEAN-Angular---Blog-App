import { Component, OnInit } from '@angular/core';
import { AjaxService } from '../../Services/ajax.service';
import { Blog } from '../../Models/blogs';
import {FormGroup,Validators,FormControl,FormArray} from '@angular/forms';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css','../../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
'../../../../node_modules/font-awesome/css/font-awesome.min.css']
})
export class BlogsComponent implements OnInit {
  blogs:any[];
  blogArrived:boolean;
  liked:boolean;
  likedClass:boolean;
  frm:FormGroup
  constructor(private ajax:AjaxService) { 
    this.blogArrived=false;
    this.blogs=[];
    this.liked=false;
    this.likedClass=false;
  }

  like(Obj){
    // console.log("OBJECT TO BE SENT IS",Obj);
    var object = {blog:{},name:''};
    object.blog=Obj;
    object.name=localStorage.getItem('user');
    var liking = this.ajax.changeLikes(object).subscribe(
      (data)=>{
        for(let i=0;i<this.blogs.length;i++){
          if(this.blogs[i]['blogId']==data.data['blogId']){
            data.data['success']=true;
            if(data['message']=="Succesfully Liked"){
              data.data['isLiked']=true;
            }
            else{
              data.data['isLiked']=false;
            }
            console.log("New data is",data);
              this.blogs[i]=data.data;
          }
        }
      },
      (err)=>{
        console.log(err)
      },
      ()=>{
      liking.unsubscribe();
    });
  }

  ngOnInit() {
    var blogged = this.ajax.loadblogs().subscribe(
      (data)=>{
        if(data['success']){
          this.blogArrived=true;
          for(let i=0;i<data['data'].length;i++){
          var Obj = data['data'][i];
          Obj.isLiked=false;
          if(Obj.likedBy.includes(localStorage.getItem('user'))){
            Obj.isLiked=true;
          }
        this.blogs.push(Obj);
      }
      }
      },
      (err)=>{
        this.blogArrived=false;
        console.log("ERR OF BLOGS IS",err);
      },
      ()=>{
        blogged.unsubscribe();
      }
    )

    this.frm = new FormGroup({
      'comment': new FormArray([])
    })
  }

  addForm(i){
    // console.log("i valus is ",i);
    // console.log("FORM VALUE",this.frm.value);
    (<FormArray>this.frm.get('comment')).push(new FormControl('',[Validators.required]));
  }

  addComment(id,i){
    // console.log(this.frm.get('comment').value);
    console.log("BLOG ID IS",id);
    for(let i=0;i<this.frm.get('comment').value.length;i++){
      if(this.frm.get('comment').value[i]==''){
        continue;
      }
    var comment = {"name":localStorage.getItem('user'),"comment":this.frm.get('comment').value[i]};
    var Obj={'blogId':id,'comment':comment};
    // Obj.blogId=id;
    // Obj.comment=comment;
      var commenting = this.ajax.addComments(Obj).subscribe(
        (data)=>{
          // console.log("THIS IS DATA",data.data);
          this.blogs[i]=data.data;
          console.log("Length is",(<FormArray>this.frm.get('comment')).length);
            while((<FormArray>this.frm.get('comment')).length!=0){
          (<FormArray>this.frm.get('comment')).removeAt(0);
        }
        },
        (err)=>{
          console.log("THIS IS ERROR",err);
        },
        ()=>{
          console.log("COMPLETED");
          commenting.unsubscribe();
        }
      )

  }
  }

  emptyFormArray(){
    while((<FormArray>this.frm.get('comment')).length!=0){
      (<FormArray>this.frm.get('comment')).removeAt(0);
    }
  }


}
