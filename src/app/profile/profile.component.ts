import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BookingDetailService } from '../shared/booking-detail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private http: HttpClient ) { }

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



  



 

}
