import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  Invalidlogin: boolean; 
  Invalidlogins: boolean=false; 
  

 
  constructor(private router: Router, private http: HttpClient) { }

 
  login(form: NgForm)
  {
    const Credential={
      'email': form.value.email,
      'password':form.value.password
    }
    console.log(Credential)
    this.http.post("https://localhost:5001/api/customer/login",Credential)
    .subscribe(Response=>{
      const token =(<any>Response).token;
      localStorage.setItem("jwt",token);
      
      this.Invalidlogin=false;
      location.reload();
      this.router.navigate(['/profile']);
      this.getId(form.value.email);
      
     // this.router.navigate(["/"]);
     
    }, err =>{
      this.Invalidlogin= true;
      
    })

  }

 
  logOut()
  {
    localStorage.removeItem("jwt");
    localStorage.clear();
    this.router.navigate(["/"]);
  }


  getId(email:any)
  {
    console.log(email);
    localStorage.setItem("email",JSON.stringify(email));
  }
  

  ngOnInit() {
   
    
    
  }

}
