import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BookingDetailService } from '../shared/booking-detail.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id2: any;
  
  

  constructor(private http: HttpClient, private router: Router ) { }
  Profile: any=[];
  PhotoFileName="anonymous.png";
  PhotoPath=environment.Photo_Url;
  books:any=[];

   
  

  ngOnInit() {
   // this.refreshList();
    
    const address: any = localStorage.getItem("email");
    var str = address;
    str = str.replace(/^"|"$/g, '');
    console.log(str);
    this.getIdofcustomer(str);
    this.getbookingdetails();
    
  }

  refreshList()
  {
    this.http.get<any>(environment.baseUrl+'booking')
    .subscribe(data=> {
      this.books=data;
    });
  }


  deleteClick(id:any){
    if(confirm('Are you sure?')){
      this.http.delete(environment.baseUrl+'booking/'+id)
      .subscribe(res=>{
        alert(res.toString());
        this.refreshList();
       
      });
    }
  }

  imageUpload(event: any)
  {
    var file=event.target.files[0];
    const formData: FormData=new FormData();
    formData.append('file', file,file.name);

    this.http.post(environment.Photo_Url, formData)
    .subscribe((data:any)=>{
      console.log(data);
      
  });
  }

  
  onSubmit(event: any) {
    
    this.http.post(environment.Photo_Url, FormData)
  }
  

  public getIdofcustomer(address:any)
  {
   
   this.http.get<any>(environment.baseUrl+'Customer/'+address)
   .subscribe(data=> {
    var jsonString = JSON.parse(JSON.stringify(data));
    
      this.id2=data;
      console.log(jsonString);
      console.log(this.id2);
      this. getbookingdetails();
      
    });
   
  }

  getbookingdetails()
  {
    this.http.get<any>(environment.baseUrl+'booking/test/'+this.id2)
    .subscribe((res) => {
    
      console.log(this.id2);
      this.books=res;
      console.log(res);
  });
  }


 

}
