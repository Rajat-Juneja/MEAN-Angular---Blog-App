import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../Models/User';
import {response,responseData} from '../Models/response';
import {LoginUser} from '../Models/LoginUser';
import {Blog, blogName, blogCom, BlogType} from '../Models/blogs';



@Injectable({
  providedIn: 'root'
})
export class AjaxService {
  flag:string;
  name:string;
  constructor(private ajaxCaller:HttpClient) { 
    this.flag='';
    this.name='';
  }



  addUser(Obj:User):Observable<response>{
    // var object={};
    // object.name=Obj.name;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    var url = 'http://localhost:5000/createUser';
    console.log("CALLED IN SERVICE",Obj);
    return this.ajaxCaller.post<response>(url,Obj,httpOptions);
  }

  getUser(Obj:LoginUser):Observable<responseData>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    var url = 'http://localhost:5000/getUser';
    console.log("CALLED IN SERVICE",Obj);
    return this.ajaxCaller.post<responseData>(url,Obj,httpOptions);
  }

  loadblogs():Observable<Blog[]>{
    var token = localStorage.getItem('token');
    token = 'Bearer '+token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
      })
    };
    var url = 'http://localhost:5000/start/blogs';
    console.log("Service of blog called",httpOptions);
    return this.ajaxCaller.get<Blog[]>(url,httpOptions);
  }

  changeLikes(Obj:blogName):Observable<Blog>{
    var token = localStorage.getItem('token');
    token = 'Bearer '+token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
      })
    };
    var url = 'http://localhost:5000/start/editBlog';
    return this.ajaxCaller.post<Blog>(url,Obj,httpOptions);
  }

  addComments(Obj:blogCom):Observable<Blog>{
    var token = localStorage.getItem('token');
    token = 'Bearer '+token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
      })
    };
    var url = 'http://localhost:5000/start/editBlogComm';
    return this.ajaxCaller.post<Blog>(url,Obj,httpOptions);
  }

  removeComment(Obj:blogCom):Observable<Blog>{
    var token = localStorage.getItem('token');
    token = 'Bearer '+token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
      })
    };
    var url = 'http://localhost:5000/start/removeComm';
    return this.ajaxCaller.post<Blog>(url,Obj,httpOptions);
  }

  removeBlog(Obj:Blog):Observable<Blog>{
    var token = localStorage.getItem('token');
    token = 'Bearer '+token;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization':token
      })
    };
    var url = 'http://localhost:5000/start/removeBlog';
    return this.ajaxCaller.post<Blog>(url,Obj,httpOptions);
  }

  addBlog(Obj:BlogType):Observable<Blog>{
    var token = localStorage.getItem('token');
    token = 'Bearer '+token;
    const httpOptions={
      headers: new HttpHeaders({
        'Content-type':'form-data',
        'Authorization':token
      })
    };
    var url = 'http://localhost:5000/start/addBlog';
    return this.ajaxCaller.post<Blog>(url,Obj,httpOptions);
  }
  
  // checkLiked(Obj:blogName):Observable<Bool>{
  //   var token = localStorage.getItem('token');
  //   token = 'Bearer '+token;
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':'application/json',
  //       'Authorization':token
  //     })
  //   };
  //   var url = 'http://localhost:5000/start/editBlog';
  //   console.log("INSIDE CHANGE LIKES");
  //   return this.ajaxCaller.post<Bool>(url,Obj,httpOptions);
  // }

}
