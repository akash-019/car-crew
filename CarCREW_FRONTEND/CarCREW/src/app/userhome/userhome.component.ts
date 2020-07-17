import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {
user
  constructor(private _my:MyserviceService,private _route:Router,private _active:ActivatedRoute) {
  
    this._my.auth().subscribe(
 
      data=>{this.user=data;localStorage.setItem('auth',this.user.role.toString());localStorage.setItem('username',this.user.username);},
      err=> this._route.navigate(['../login'],{relativeTo:this._active})
      
      );
     
        
   }

  ngOnInit() {
    

  }

 


  logout(){
    localStorage.removeItem('token');
    localStorage.setItem("auth","guest");
    this._route.navigate(['/login'],{relativeTo:this._active});
  }
}
