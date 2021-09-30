import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';


const routes: Routes = [
{path: 'home' , component: HomeComponent},
{path: 'profile', component: ProfileComponent},
{path: 'booking', component: BookingComponent },

{
  path:"add/:bookingId",
  component: BookingComponent
},

{
  path:"Edit/:bookingId",
  component: BookingComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
