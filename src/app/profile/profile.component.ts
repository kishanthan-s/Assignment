import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BookingDetailService } from '../shared/booking-detail.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id2: any;
  
  

  constructor(private http: HttpClient, private router: Router , public fb: FormBuilder) { 
    this.myForm = this.fb.group({
      img: [null],
      filename: ['']
    })
  }
  Profile: any=[];
  PhotoFileName="anonymous.png";
  PhotoPath=environment.Photo_Url;
  books:any=[];
  filePath: string;
  myForm: FormGroup;

   
  

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
//image upload
 // imageUpload(event: any)
 // {
 //   var file=event.target.files[0];
 ///   const formData: FormData=new FormData();
 ///   formData.append('file', file,file.name);

 //   this.http.post(environment.Photo_Url, formData)
 //   .subscribe((data:any)=>{
 //     console.log(data);
      
  //});
  //}

  
  //onSubmit(event: any) {
    
  //  this.http.post(environment.Photo_Url, FormData)
  //}
  
//image upload


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

//image upload
  imagePreview(e:any) {
    const file = (e.target ).files[0];
 
     this.myForm.patchValue({
       img: File
     });
 
     this.myForm.get('img')!.updateValueAndValidity()
 
     const reader = new FileReader();
     reader.onload = () => {
       this.filePath = reader.result as string;
     }
     reader.readAsDataURL(file)
   }
 
  

   upload(files:any) {
    if (files.length === 0)
      return;
  
    const formData = new FormData();
  
    for (const file of files) {
      formData.append(file.name, file);
    }
  
  
  
    this.http.post("https://localhost:5001/api/Image/"+this.id2, formData).subscribe(event => {
     
      console.log("sucess");
      console.log(formData);
      location.reload()
 
     
    },
    error => {
      console.log(error);
    });
  }
 

 //image upload

}
