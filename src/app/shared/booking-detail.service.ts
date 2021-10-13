import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookingDetail } from './booking-detail.model';

@Injectable({
  providedIn: 'root'
})
export class BookingDetailService {

  readonly baseurl='https://localhost:5001/api/booking'

  books:any=[];

  constructor(private http: HttpClient) { }

  formData: BookingDetail=new BookingDetail();

  postBooking()
  {
    return this.http.post(environment.baseUrl+'booking',this.formData);
  }

  putBooking(id1: number)
  {
    console.log(this.formData);
   return this.http.put(environment.baseUrl+'booking/'+id1,this.formData);

    //return this.http.put('${this.baseurl}/${this.formData.bookingId}', this.formData);
  }

  ongetBooking(id1:number): Observable<BookingDetail[]>
  {
    console.log("test");
    return this.http.get<BookingDetail[]>(environment.baseUrl+'booking/'+id1);
    
    
  }

  putBookings(booking: BookingDetail)
  {
    console.log(booking);
   return this.http.put(environment.baseUrl+'booking/'+booking.BookingId,booking);

    //return this.http.put('${this.baseurl}/${this.formData.bookingId}', this.formData);
  }
  
}
