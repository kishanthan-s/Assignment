import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css']
})
export class NavibarComponent implements OnInit {

  imageToShow: any;

  constructor(private jwtHelper: JwtHelperService, private router: Router, private http: HttpClient,private sanitizer: DomSanitizer) { }
 
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
      this.getImage();
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

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imageToShow = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
 }

 



 getImage() {
  
  this.http.get("https://localhost:5001/api/Image/test/"+"32c14414-226a-4674-aa28-cd19bf839c6f", { responseType: 'blob' }).subscribe(data => {
     this.createImageFromBlob(data);
     console.log("sucess");
     
  }, error => {
     
     console.log(error);
  });
}

  

}
