import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal:any;
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  ispassword:boolean;
  myform:FormGroup;
  servicecate;
  userdata;
  constructor(private _my:MyserviceService,private _route:Router,private _active:ActivatedRoute) {

    this._my.auth().subscribe(
      (data: any) => {
        if (data.role !="Admin") {
          this._route.navigate(['../login'], { relativeTo: this._active })
        }
        else{console.log(data);localStorage.setItem('auth',data.role.toString());}
      },
      err => {this._route.navigate(['../login'], { relativeTo: this._active })}
    )

    this._my.getservicecategories().subscribe(
      data => { this.servicecate = data; console.log(data) },

    )

    this._my.getusers().subscribe(
      data => { this.userdata = data; console.log(data) },
     
    )
     

    this.myform=new FormGroup(
      {
        Service_Category_Id:new FormControl(null,Validators.required),
        Service_Status:new FormControl(null,Validators.required),
        Service_Car_No:new FormControl(null,Validators.required),
        Service_Customer_Id:new FormControl(null,Validators.required),
        Service_Paid_Status:new FormControl(null,Validators.required)
       
      }
    );
   }

  ngOnInit() {
  }

  add()
  {
   if(this.myform.valid)
    {console.log(this.myform.value)
    this._my.addservice(this.myform.value).subscribe(
      data=>{console.log(data);swal("Generated!", "Your Detail has been save.", "success"); this._route.navigate(['../service'], { relativeTo: this._active })}
    )
     
    }else
    {
      this.ispassword=true;
    }
  }
}
