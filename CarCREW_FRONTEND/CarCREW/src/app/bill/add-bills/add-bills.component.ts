import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal;
declare var $;
@Component({
  selector: 'app-add-bills',
  templateUrl: './add-bills.component.html',
  styleUrls: ['./add-bills.component.css']
})
export class AddBillsComponent implements OnInit {

  ispassword: boolean;
  myform: FormGroup;
  restserv;
  userdata;
  category;
  isrecord = false;
  service: Array<string> = [];
  constructor(private _my: MyserviceService, private _route: Router, private _active: ActivatedRoute) {
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
      data => { this.category = data; console.log(data) },

    );
    this._my.getusers().subscribe(
      data => { this.userdata = data; console.log(data) },

    )


    this.myform = new FormGroup(
      {
        Service_Customer_Id: new FormControl(null, Validators.required)
      }
    );

    $(document).ready(function () {
      $("#Search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#table tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  }

  ngOnInit() {
  }

  find() {
    if (this.myform.valid) {
      console.log(this.myform.value)
      this._my.servicebyidrest(this.myform.value.Service_Customer_Id).subscribe(
        data => {
          console.log(data); this.restserv = data; this.isrecord = true; swal("Generated!", "Your Detail has been save.", "success");
          this.restserv.forEach(element => {
            this.service.push(element._id)
          })
         
        }


      )





    } else {
      this.ispassword = true;
    }
  }



  add() {
    var abc = { Bill_Customer_Id: this.myform.value.Service_Customer_Id, Bill_Service_Id: this.service }
    this._my.addbill(abc).subscribe(
      data => { console.log(data); swal("Generated!", "Your Detail has been save.", "success"); this._route.navigate(['../bills'], { relativeTo: this._active })}
    )
  }
}
