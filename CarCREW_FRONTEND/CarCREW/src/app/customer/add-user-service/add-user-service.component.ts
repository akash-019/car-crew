import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal;
@Component({
  selector: 'app-add-user-service',
  templateUrl: './add-user-service.component.html',
  styleUrls: ['./add-user-service.component.css']
})
export class AddUserServiceComponent implements OnInit {

  ispassword:boolean;
  myform:FormGroup;
  servicecate;
  userdata;
  price;
  constructor(private _my:MyserviceService,private _route:Router,private _active:ActivatedRoute) {

    this._my.auth().subscribe(
      (data: any) => {
        if (data.role !="User") {
          this._route.navigate(['../login'], { relativeTo: this._active })
        }
        else{console.log(data);this.userdata=data;
          
          this.myform=new FormGroup(
            {
              Service_Category_Id:new FormControl(null,Validators.required),
              Service_Status:new FormControl("pending",Validators.required),
              Service_Car_No:new FormControl(null,Validators.required),
              Service_Customer_Id:new FormControl(data.id,Validators.required),
              Service_Paid_Status:new FormControl("false",Validators.required)
             
            }
          );
          
          ;localStorage.setItem('auth',data.role.toString());}
      },
      err => {this._route.navigate(['../login'], { relativeTo: this._active })}
    )

    this._my.getservicecategories().subscribe(
      data => { this.servicecate = data; console.log(data)},

    )

   
     

   
     }

  ngOnInit() {
    this.myform.patchValue({Service_Category_Id:this.userdata.id})
  
  }

  add()
  {
   if(this.myform.valid)
    {console.log(this.myform.value)
    this._my.addservice(this.myform.value).subscribe(
      data=>{console.log(data);swal("Generated!", "Your Detail has been save.", "success"); this._route.navigate(['../userService'], { relativeTo: this._active })}
    )
     
    }else
    {
      this.ispassword=true;
    }
  }
}
