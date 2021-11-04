import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BookingDetailService } from '../shared/booking-detail.service';
import { NgForm } from '@angular/forms';
import { BookingDetail } from '../shared/booking-detail.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

export class BookingComponent implements OnInit {

  books: any = [];
  booking: BookingDetail = {
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


  test = "hello";
  id1: number;
  id2: any;

  constructor(private http: HttpClient, public service: BookingDetailService, private toastr: ToastrService, private route: ActivatedRoute) {

  }



  ngOnInit() {

    //const id = this.route.snapshot.paramMap.get('bookingId');
    this.id1 = +this.route.snapshot.params['bookingId'];

    if (this.id1 === 0) {

      //this.booking=this.service.ongetBooking(this.id1);

    }
    else {
      this.service.ongetBooking(this.id1).subscribe(
        (res) => {
          // this.booking=res;
          // this.service.formData=res;
          console.log(res);
          this.books = res;
          //this.service.formData.FirstName = "iresh";

        });




    }

    //  this.id2 = +this.route.snapshot.params['form.value.email'];
    const address: any = localStorage.getItem("email");
    var str = address;
    str = str.replace(/^"|"$/g, '');
    console.log(str);
    this.getIdofcustomer(str);

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

  createClick(form: NgForm) {
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

  updateClick(form: NgForm) {


    let booking: BookingDetail = {
      BookingId: this.books.bookingId,
      FirstName: form.value.FirstName,
      LastName: form.value.LastName,
      Email: form.value.Email,
      StreetAddress: form.value.StreetAddress,
      City: form.value.City,
      Provience: form.value.Provience,
      ZipCode: form.value.ZipCode,
      Phone_Number: form.value.Mobilenumber,
      PhotoFileName: form.value.PhotoFileName,
      RoomType: form.value.RoomType,
      SmokingRoom: form.value.SmokingRoom,
      LeasePocketWIFI: form.value.LeasePocketWIFI

    }
    this.service.putBookings(booking).subscribe(
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

  // let booking: BookingDetail={
  //   BookingId:form.value.BookingId,
  //    FirstName:form.value.FirstName,
  //    LastName:form.value.LastName,
  //    Email:form.value.Email,
  //   StreetAddress:form.value.StreetAddress,
  //   City:form.value.City,
  //   Provience:form.value.Provience,
  //   ZipCode:form.value.ZipCode,
  //   Phone_Number:form.value.Phone_Number,
  //   PhotoFileName:form.value.PhotoFileName,
  //   RoomType:form.value.RoomType,
  //   SmokingRoom:form.value.SmokingRoom,
  //   LeasePocketWIFI:form.value.LeasePocketWIFI

  // }


  getIdofcustomer(address:any)
  {
   
   this.http.get<any>(environment.baseUrl+'Customer/'+address)
   .subscribe(data=> {
    var jsonString = JSON.parse(JSON.stringify(data));
    
      this.id2=data;
      console.log(jsonString);
      console.log(this.id2);
      
    });
  }

  
  
}
