import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  id;
  ispassword:boolean;
  myform:FormGroup;
 userdata;
  constructor(private _my:MyserviceService,private _route:Router,private _active:ActivatedRoute) {

    console.log(this.id);
    this.myform=new FormGroup(
      {
        User_Name:new FormControl(null,Validators.required),
        User_Email:new FormControl(null,Validators.required),
        User_Password:new FormControl(null,Validators.required),
        User_Mobile_No:new FormControl(null,Validators.required),
       
        User_Address:new FormControl(null,Validators.required)

       
      })
  

     


   
     
     
   }

  ngOnInit() {
    this._my.auth().subscribe(
      (data: any) => {
        if (data.role !="User") {
          this._route.navigate(['../login'], { relativeTo: this._active })
        }
        else{console.log(data);this.id=data.id;
          
          this._my.getuser(this.id).subscribe((data:any)=>{
            this.myform.setValue({
              User_Name:data.User_Name,
              User_Email:data.User_Email,
              User_Password:data.User_Password,
              User_Mobile_No:data.User_Mobile_No,
           
              User_Address:data.User_Address
            })
          });
          this._my.getuser(data.id).subscribe(data=>{this.userdata=data})
          localStorage.setItem('auth',data.role.toString());}
      },
      err => {this._route.navigate(['../login'], { relativeTo: this._active })}
    )
  }

  add()
  {
   if(this.myform.valid)
    {console.log(this.myform.value)
    this._my.edituser(this.myform.value,this.id).subscribe(
    data=>{console.log(data); swal("Updated!", "Your Detail has been save.", "success");this.ngOnInit()},
      err => this._route.navigate(['../login'], { relativeTo: this._active })
    )
     
    }else
    {
      this.ispassword=true;
    }
  }
}
