import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;
declare var swal: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user
  userdata
  index: number = 0;
  constructor(private _my: MyserviceService, private _route: Router, private _active: ActivatedRoute) {

    
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

   
       
   

    this._my.getusers().subscribe(
      data => { this.userdata = data; console.log(data) },
         );


    $(document).ready(function () {
      $("#Search").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#usertable tr").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });

  }

  add()
  {
    this._route.navigate(['../addUser'], { relativeTo: this._active })
  }


  edit(arg) {
    this._route.navigate(['./editUser',arg])
  }
  delete(arg) {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result)=>{
      if(result)
      {
        this._my.deleteuser(arg).subscribe(data=>{swal("Deleted!", "Your imaginary file has been deleted.", "success");this.ngOnInit()})
      }
      else
      {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    })
           
  }

}
