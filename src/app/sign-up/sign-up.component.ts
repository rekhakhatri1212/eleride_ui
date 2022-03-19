import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../models/user.model';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { ConfirmValidParentMatcher, CustomValidators, errorMessages, regExps } from '../shared/custom-validator.sevice';

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
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();

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
        Validators.pattern(regExps['phoneNumber'])
      ]],
      passwordGroup: this.formBuilder.group({
        password: [this.user.password, [
            Validators.required,
            Validators.pattern(regExps['password'])
        ]],
        confirmPassword: ['', Validators.required]
    }, { validator: CustomValidators.childrenEqual}),
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

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

}
