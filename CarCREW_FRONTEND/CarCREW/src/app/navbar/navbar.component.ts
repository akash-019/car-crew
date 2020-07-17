import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _route:Router,private _active:ActivatedRoute) { }

  ngOnInit() {
  }
  
auth(key:string):string
{
  return localStorage.getItem(key);
}


getuser()
{
  return localStorage.getItem("username")
}


logout(){
  localStorage.removeItem('token');
  localStorage.setItem("auth","guest");
  this._route.navigate(['/login'],{relativeTo:this._active});
}
}
