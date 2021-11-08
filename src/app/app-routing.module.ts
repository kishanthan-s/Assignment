import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingComponent } from './booking/booking.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
{path: 'home' , component: HomeComponent},
{path: 'signup' , component: SignupComponent},
{path: 'profile', component: ProfileComponent,   canActivate:[AuthGuard]},//,   canActivate:[AuthGuard]
//{path: 'booking', component: BookingComponent },

{
  path:"add/:bookingId",
  component: BookingComponent,   canActivate:[AuthGuard]
},//

{
  path:"Edit/:bookingId",
  component: BookingComponent,   canActivate:[AuthGuard]
}//,   canActivate:[AuthGuard]

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
