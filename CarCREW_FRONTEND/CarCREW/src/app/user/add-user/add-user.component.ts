import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal:any;
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  ispassword:boolean;
  myform:FormGroup;
  constructor(private _my:MyserviceService,private _route:Router,private _active:ActivatedRoute) {
    this.myform=new FormGroup(
      {
        User_Name:new FormControl(null,Validators.required),
        User_Email:new FormControl(null,Validators.required),
        User_Password:new FormControl(null,Validators.required),
        User_Mobile_No:new FormControl(null,Validators.required),
        User_Address:new FormControl(null,Validators.required)
       
      }
    );
   }

  ngOnInit() {
    this._my.auth().subscribe(
      (data: any) => {
        if (data.role !="Admin") {
          this._route.navigate(['../login'], { relativeTo: this._active })
        }
        else{console.log(data);localStorage.setItem('auth',data.role.toString());}
      },
      err => {this._route.navigate(['../login'], { relativeTo: this._active })}
    )
  }

  add()
  {
   if(this.myform.valid)
    {console.log(this.myform.value)
    this._my.adduser(this.myform.value).subscribe(
      data=>{console.log(data);swal("Generated!", "Your Detail has been save.", "success"); this._route.navigate(['../user'], { relativeTo: this._active })},
     
    )
     
    }else
    {
      this.ispassword=true;
    }
  }
}
