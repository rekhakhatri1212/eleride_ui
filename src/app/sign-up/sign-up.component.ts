import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User;
  signUpForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;

  constructor(private formBuilder: FormBuilder, private socialAuthService: SocialAuthService) { 
    this.user = new User();
   }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      'name': [this.user.name, [
        Validators.required
      ]],
      'email': [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      'phoneNumber': [this.user.phoneNumber, [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
      ]],
      'password': [this.user.password, [
        Validators.required,
        Validators.minLength(6)
      ]]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user !== null;
      console.log(this.socialUser);
    });
  }

  /* Handle form errors */
  public errorHandling = (control: string, error: string) => {
    return this.signUpForm.controls[control].hasError(error);
  }

  onSubmit() {}

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
