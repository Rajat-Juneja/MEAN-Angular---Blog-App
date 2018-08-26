import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';

import {StartComponent} from '../Components/start/start.component';
import {LoginComponent} from '../Components/login/login.component';
import { RegisterComponent } from '../Components/register/register.component';
import { BlogsComponent } from '../Components/blogs/blogs.component';
import { UserComponent } from '../Components/user/user.component';
const routes = [
  {
    path:'start',
    component:StartComponent,
    children:[
      {
      path:'blogs',
      component:BlogsComponent
      }    ]
  },
  {
    path:'',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule],
  declarations: []
})
export class RoutesModule { }
