import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css']
})
export class NavibarComponent implements OnInit {

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }
 
  Invalidlogins: boolean=false;

  ngOnInit() {
    this.isUserAuthenticated();
  }

    


 

  isUserAuthenticated()
  {
    const token: any = localStorage.getItem("jwt");
    if(token  && !this.jwtHelper.isTokenExpired(token)){
      
      this.Invalidlogins=true;
      console.log(this.Invalidlogins);
      return true;
    }
    else
    {
      
      this.Invalidlogins=false;
      console.log(this.Invalidlogins);
      return false;
    }
  }

  logOut()
  {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
    location.reload();
  
  }

}
