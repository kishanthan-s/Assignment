import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BookingDetailService } from '../shared/booking-detail.service';
import { NgForm } from '@angular/forms';
import { BookingDetail } from '../shared/booking-detail.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {

 
  booking: BookingDetail={
    BookingId: 0,
    FirstName: '',
    LastName: '',
    Email: '',
    StreetAddress: '',
    City: '',
    Provience: '',
    ZipCode: '',
    Phone_Number: '',
    RoomType: '',
    PhotoFileName: '',
    SmokingRoom: '',
    LeasePocketWIFI: ''
  };
  
  id1: number;
  constructor(private http: HttpClient,public service: BookingDetailService, private toastr: ToastrService,private route: ActivatedRoute) { 
    
  }
  
  

  ngOnInit(){
    
    //const id = this.route.snapshot.paramMap.get('bookingId');
    this.id1 = +this.route.snapshot.params['bookingId'];
    
    if(this.id1!=0)
    {
      //console.log("edit");
     //  
    }
    else
    {
      //console.log("add");
     
    }
    
   

    
  }

  onSubmit(form: NgForm) {
    this.service.postBooking().subscribe(
      (res) => {
        console.log("Submitted sucessfully");
        this.resetform(form);
        this.toastr.success('Submitted sucessfully', 'Booking detail register')
      },
      (err) => {
        console.log(err);
      }

    );

  }

  


  resetform(form: NgForm) {
    form.form.reset();
    this.service.formData = new BookingDetail();
  }

  createClick(form: NgForm){
    this.service.postBooking().subscribe(
      (res) => {
        console.log("Submitted sucessfully");
        this.resetform(form);
        this.toastr.success('Submitted sucessfully', 'Booking detail register')
      },
      (err) => {
        console.log(err);
      }

    );

  }

  updateClick(form: NgForm){
    this.service.putBooking(this.id1).subscribe(
      (res) => {
        console.log("updated sucessfully");
        this.resetform(form);
        this.toastr.success('updated sucessfully', 'Booking detail register')
      },
      (err) => {
        console.log(err);
      }

    );

  }



}
