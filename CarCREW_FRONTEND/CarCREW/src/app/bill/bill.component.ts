import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal, $;
@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
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
        if (data.role != "Admin") {
          this._route.navigate(['../login'], { relativeTo: this._active })
        }
        else { console.log(data); localStorage.setItem('auth', data.role.toString()); }
      },
      err => { this._route.navigate(['../login'], { relativeTo: this._active }) }
    )

    this._my.getbills().subscribe(
      data => { this.billdata = data; console.log(data) },
    )

    this._my.getusers().subscribe(
      data => { this.userdata = data; console.log(data) },
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

  add() {
    this._route.navigate(['../getBill'], { relativeTo: this._active })
  }

  delete(arg) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result) {
        this._my.deletebill(arg).subscribe(data => { console.log(data); swal("Deleted!", "Your imaginary file has been deleted.", "success"); this.ngOnInit() })
      }
      else {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    })

  }
  emailstatus: boolean;
  sendemail(bid) {
    this._my.sendemail(bid).subscribe(
      data => { console.log(data); this.ngOnInit() }
    )
  }
}

