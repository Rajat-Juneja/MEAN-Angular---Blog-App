import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {RoutesModule} from './Routes/routes.module';

import { AppComponent } from './app.component';
// import { MainComponent } from './Components/main/main.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';

import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AjaxService} from './Services/ajax.service';
import { StartComponent } from './Components/start/start.component';
import { HeaderComponent } from './Components/header/header.component';
import { BlogsComponent } from './Components/blogs/blogs.component';
import { UserComponent } from './Components/user/user.component';
import { AddblogComponent } from './Components/addblog/addblog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StartComponent,
    HeaderComponent,
    BlogsComponent,
    UserComponent,
    AddblogComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RoutesModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [AjaxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
