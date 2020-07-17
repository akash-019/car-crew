import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { from, empty } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ispassword: boolean;
  myform: FormGroup;
  data: object;
  constructor(private _my: MyserviceService, private _route: Router, private _active: ActivatedRoute) {
    this.myform = new FormGroup(
      {

        email: new FormControl(null, Validators.required),
        pass: new FormControl(null, Validators.required)

      }
    );
  }

  ngOnInit() {
  }
  login() {
    if (this.myform.valid) {
      this._my.login(this.myform.value).subscribe(

        data => { this.data = data;
        console.log(data);
          if(this.data==null) {
            this.ispassword = true;
          }
        }

      );

      if (this.data != null) {
        localStorage.setItem('token', this.data.toString());
        this._route.navigate(['../userhome'], { relativeTo: this._active });
      }
      
      
    }
    
  }

}
