import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {AjaxService} from '../../Services/ajax.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css','../../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class StartComponent implements OnInit {

  constructor(private route:ActivatedRoute,private service:AjaxService) { 

  }

  ngOnInit() {
    // console.log(this.route.snapshot.queryParams.email);
    // console.log(this.route.snapshot.queryParams.name);
    this.service.name= this.route.snapshot.queryParams.name;
  }

}
