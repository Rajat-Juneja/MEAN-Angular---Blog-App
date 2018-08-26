import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AjaxService} from '../../Services/ajax.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css','../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class HeaderComponent implements OnInit {
  user:string;
  name:string;
  constructor(private router:Router,private service:AjaxService) { 
    this.user='';
    this.name='';
  }

  ngOnInit() {
    this.user = this.service.name;
    this.name=localStorage.getItem('user');
  }

  logOut(){
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

}
