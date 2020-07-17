import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {MyserviceService} from '../myservice.service';
import { from } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ispassword:boolean;
  myform:FormGroup;
  success=false;
  constructor(private _my:MyserviceService) {
    this.myform=new FormGroup(
      {
        name:new FormControl(null,Validators.required),
        email:new FormControl(null,Validators.required),
        pass:new FormControl(null,Validators.required),
        cpass:new FormControl(null,Validators.required)
      }
    );
   }

  ngOnInit() {
  }

  register()
  {
   if(this.myform.value.pass==this.myform.value.cpass)
    {
    this._my.submit(this.myform.value).subscribe(
      data=>console.log(data)
      );
     console.log(this.myform.value);
     this.success=true;
    }else
    {
      this.ispassword=true;
    }
  }
}
