import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingDetailService } from '../shared/booking-detail.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public http: HttpClient, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm ){
    const Credential={
      'firstName': form.value.FirstName,
      'lastName': form.value.LastName,
      'email': form.value.Email,
      'Password': form.value.Password,
      'confirmpassword':form.value.ConfirmPassword
    }
    console.log(Credential)
    this.http.post("https://localhost:5001/api/customer/register",Credential)
    .subscribe(
      (res)=>{
        console.log("Submitted sucessfully");
      //  location.reload();
        this.toastr.success('Submitted sucessfully', 'signup detail register')
        //added for submission
        form.form.reset();
        setTimeout(
           () => {
             this.router.navigate(['/home']);
          } ,5000
        );
        
      },
      (err)=>{
        console.log(err);
        this.toastr.warning('Email is been used')

      }
    );
  }

}
