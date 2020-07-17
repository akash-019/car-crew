import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tick } from '@angular/core/testing';

declare var $;
@Component({
  selector: 'app-my-service',
  templateUrl: './my-service.component.html',
  styleUrls: ['./my-service.component.css']
})
export class MyServiceComponent implements OnInit {

  user
  servicedata
  servicecate
  userdata
  constructor(private _my: MyserviceService, private _route: Router, private _active: ActivatedRoute) {

    
  }

  ngOnInit() {
    this._my.auth().subscribe(
      (data: any) => {
        if (data.role !="User") {
          this._route.navigate(['../login'], { relativeTo: this._active })
        }
        else{console.log(data);localStorage.setItem('auth',data.role.toString());}
      },
      err => {this._route.navigate(['../login'], { relativeTo: this._active })}
    )

    this._my.auth().subscribe(
      data => { this.user = data; localStorage.setItem('auth', this.user.role.toString()); })
     

    this._my.getservices().subscribe(
      data => { this.servicedata = data; console.log(data) }
         );

    this._my.getservicecategories().subscribe(
      data => { this.servicecate = data; console.log(data) },
     
    )
     
    $(document).ready(function () {
      $("#Search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#table tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  }

 
  add()
  {
    this._route.navigate(['../userAddService'], { relativeTo: this._active })
  }
 

}
