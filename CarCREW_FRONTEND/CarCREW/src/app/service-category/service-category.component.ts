import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal:any;
declare var $:any;
@Component({
  selector: 'app-service-category',
  templateUrl: './service-category.component.html',
  styleUrls: ['./service-category.component.css']
})
export class ServiceCategoryComponent implements OnInit {

  user
  category
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

    this._my.auth().subscribe(
      data => { this.user = data; localStorage.setItem('auth', this.user.role.toString()); },
     
    );

    this._my.getservicecategories().subscribe(
      data => { this.category = data; console.log(data) },
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
    this._route.navigate(['../addCategory'], { relativeTo: this._active })
  }


  edit(arg) {
    
    this._route.navigate(['../editCategory',arg])
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
        this._my.deleteservicecategory(arg).subscribe(data=>{swal("Deleted!", "Your imaginary file has been deleted.", "success");this.ngOnInit()})
      }
      else
      {
        swal("Cancelled", "Your imaginary file is safe :)", "error");
      }
    })
           
  }

}
