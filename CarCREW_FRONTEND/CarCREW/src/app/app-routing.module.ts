import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserhomeComponent } from './userhome/userhome.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { ServiceComponent } from './service/service.component';
import { AddServiceComponent } from './service/add-service/add-service.component';
import { EditServiceComponent } from './service/edit-service/edit-service.component';
import { ServiceCategoryComponent } from './service-category/service-category.component';
import { AddCategoryComponent } from './service-category/add-category/add-category.component';
import { EditCategoryComponent } from './service-category/edit-category/edit-category.component';
import { AddBillsComponent } from './bill/add-bills/add-bills.component';
import { BillComponent } from './bill/bill.component';
import { MyServiceComponent } from './customer/my-service/my-service.component';
import { MyBillsComponent } from './customer/my-bills/my-bills.component';
import { AddUserServiceComponent } from './customer/add-user-service/add-user-service.component';
import { ProfileComponent } from './customer/profile/profile.component';
import { ForgotComponent } from './forgot/forgot.component';


const routes: Routes = [
  {path:'',redirectTo:'homepage',pathMatch:'full'},
  {path:'homepage',component:HomepageComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'userhome',component:UserhomeComponent},
  {path:'user',component:UserComponent},
  {path:'addUser',component:AddUserComponent},
  {path:'editUser/:id',component:EditUserComponent},
  {path:'service',component:ServiceComponent},
  {path:'addService',component:AddServiceComponent},
  {path:'editService/:id',component:EditServiceComponent},
  {path:"serviceCategory",component:ServiceCategoryComponent},
  {path:'addCategory',component:AddCategoryComponent},
  {path:'editCategory/:id',component:EditCategoryComponent},
  {path:'getBill',component:AddBillsComponent},
  {path:'bills',component:BillComponent},
  {path:"userService",component:MyServiceComponent},
  {path:"userBills",component:MyBillsComponent},
  {path:"userAddService",component:AddUserServiceComponent},
  {path:'userProfile',component:ProfileComponent},
  {path:'forgot',component:ForgotComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
