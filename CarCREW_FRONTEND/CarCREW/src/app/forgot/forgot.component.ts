import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  ispassword: boolean;
  myform: FormGroup;
  data: object;
  constructor(private _my: MyserviceService, private _route: Router, private _active: ActivatedRoute) {
    this.myform = new FormGroup(
      {

        name: new FormControl(null, Validators.required),
        email: new FormControl(null, Validators.required)

      }
    );
  }

  ngOnInit() {
  }
  logout() {
    if (this.myform.valid) {
      this._my.forgot(this.myform.value).subscribe(

        data => { this.data = data;
        console.log(data);
          if(this.data!=null) {
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
