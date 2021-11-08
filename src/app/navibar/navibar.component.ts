import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navibar',
  templateUrl: './navibar.component.html',
  styleUrls: ['./navibar.component.css']
})
export class NavibarComponent implements OnInit {

  imageToShow: any;
  id2: any;
  

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
      this.initiationtogetId();
      console.log(this.id2);
      
      
      
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

 





initiationtogetId()
{
  const address: any = localStorage.getItem("email");
  var str = address;
  str = str.replace(/^"|"$/g, '');
  console.log(str);
  this.getIdofcustomer(str);
}

public getIdofcustomer(address:any)
{
 
 this.http.get<any>(environment.baseUrl+'Customer/'+address)
 .subscribe(data=> {
  var jsonString = JSON.parse(JSON.stringify(data));
  
    this.id2=data;
    console.log(jsonString);
    console.log(this.id2);
    this.getImage(this.id2);
    
    
  });
 
}

getImage(id3:any) {
  
  this.http.get("https://localhost:5001/api/Image/test/"+id3, { responseType: 'blob' }).subscribe(data => {
     this.createImageFromBlob(data);
     console.log("sucess");
     console.log(this.id2);
     
  }, error => {
     
     console.log(error);
    
  });
}

  

}
