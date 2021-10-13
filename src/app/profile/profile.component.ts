import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BookingDetailService } from '../shared/booking-detail.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  

  constructor(private http: HttpClient ) { }
  Profile: any=[];
  PhotoFileName="anonymous.png";
  PhotoPath=environment.Photo_Url;
  books:any=[];

   
  

  ngOnInit(): void {
    this.refreshList();
   
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
  

  



 

}
