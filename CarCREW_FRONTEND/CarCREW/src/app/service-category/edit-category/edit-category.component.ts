import { Component, OnInit, RootRenderer } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var swal;
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  id= this._active.snapshot.paramMap.get('id');
  ispassword:boolean;
  myform:FormGroup;
  constructor(private _my:MyserviceService,private _route:Router,private _active:ActivatedRoute) {
    this._my.auth().subscribe(
      (data: any) => {
        if (data.role !="Admin") {
          this._route.navigate(['../login'], { relativeTo: this._active })
        }
        else{console.log(data);localStorage.setItem('auth',data.role.toString());}
      },
      err => {this._route.navigate(['../login'], { relativeTo: this._active })}
    )


    this.myform=new FormGroup(
      {
        Service_Name:new FormControl(null,Validators.required),
        Service_Price:new FormControl(null,Validators.required),
        Service_Description:new FormControl(null,Validators.required)
      })
    this._my.getservicecategory(this.id).subscribe((data:any)=>{
      this.myform.setValue({
        Service_Price:data.Service_Price,
        Service_Name:data.Service_Name,
        Service_Description:data.Service_Description
      })
     })
  }
  ngOnInit() {

  }

  add()
  {
   if(this.myform.valid)
    {console.log(this.myform.value)
    this._my.editservicecategory(this.myform.value,this.id).subscribe(
      data=>{console.log(data);swal("updated!", "Your Detail has been save.", "success"); this._route.navigate(['../../serviceCategory'], { relativeTo: this._active })},
     
    )
     
    }else
    {
      this.ispassword=true;
    }
  }
}
