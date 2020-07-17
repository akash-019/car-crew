import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { MyserviceService } from './myservice.service';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { from } from 'rxjs';
import { HomepageComponent } from './homepage/homepage.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ServiceComponent } from './service/service.component';
import { AddServiceComponent } from './service/add-service/add-service.component';
import { EditServiceComponent } from './service/edit-service/edit-service.component';
import { ServiceCategoryComponent } from './service-category/service-category.component';
import { AddCategoryComponent } from './service-category/add-category/add-category.component';
import { EditCategoryComponent } from './service-category/edit-category/edit-category.component';
import { BillComponent } from './bill/bill.component';
import { AddBillsComponent } from './bill/add-bills/add-bills.component';
import { EditBillsComponent } from './bill/edit-bills/edit-bills.component';
import { CommonModule } from '@angular/common';
import { MyBillsComponent } from './customer/my-bills/my-bills.component';
import { MyServiceComponent } from './customer/my-service/my-service.component';
import { AddUserServiceComponent } from './customer/add-user-service/add-user-service.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { ForgotComponent } from './forgot/forgot.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent,
    HomepageComponent,
    NavbarComponent,
    UserComponent,
    AddUserComponent,
    EditUserComponent,
    ServiceComponent,
    AddServiceComponent,
    EditServiceComponent,
    ServiceCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BillComponent,
    AddBillsComponent,
    EditBillsComponent,
    MyBillsComponent,
    MyServiceComponent,
    AddUserServiceComponent,
    ProfileComponent,
    ForgotComponent
    
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [ MyserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
