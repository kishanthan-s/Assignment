import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingDetail } from './booking-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailService {

  

  constructor(private http: HttpClient) { }

  formData: BookingDetail=new BookingDetail();

  postBooking()
  {
    return this.http.post(environment.baseUrl+'booking',this.formData);
  }

  putBooking(id1: number)
  {
    return this.http.put(environment.baseUrl+'booking/'+id1,this.formData);
  }

  ongetBooking(id1:number)
  {
    return this.http.get<any>(environment.baseUrl+'booking/'+id1);
  }

  
}
