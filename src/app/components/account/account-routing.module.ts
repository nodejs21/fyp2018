import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AccountComponent } from './account.component';

const routes: Routes = [
  {path: '', redirectTo: 'profile', pathMatch: 'full'},
  {path: '', component: AccountComponent, children: [
    // {path: 'profile', component: ProfileComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'reset-password', component: ResetpasswordComponent},
  ]},
  {path: '**', redirectTo: 'profile', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
