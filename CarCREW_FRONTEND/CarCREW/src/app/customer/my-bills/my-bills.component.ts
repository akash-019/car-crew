import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal,$;
@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.component.html',
  styleUrls: ['./my-bills.component.css']
})
export class MyBillsComponent implements OnInit {
  billdata;
  userdata;
  servicedata;
  servcate;
  amountserv;
  constructor(private _my: MyserviceService, private _route: Router, private _active: ActivatedRoute) {

  }



  ngOnInit() {
    this._my.auth().subscribe(
      (data: any) => {
        if (data.role != "User") {
          this._route.navigate(['../login'], { relativeTo: this._active })
        }
        else { console.log(data);this.userdata=data; localStorage.setItem('auth', data.role.toString()); }
      },
      err => { this._route.navigate(['../login'], { relativeTo: this._active }) }
    )

    this._my.getbills().subscribe(
      data => { this.billdata = data; console.log(data) },
    )

   

    this._my.getservices().subscribe(
      data => { this.servicedata = data; console.log(data) },
    )

    this._my.getservicecategories().subscribe(
      data => { this.servcate = data; console.log(data) })


    $(document).ready(function () {
      $("#Search").on("keyup", function () {

        var value = $(this).val().toLowerCase();
        $("#table tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }


}

