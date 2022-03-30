import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SignUpFormControls } from '../models/sign-up-form-controls.model';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { ConfirmValidParentMatcher, ConfirmValidMatcher, CustomValidators, errorMessages, regExps } from '../shared/custom-validator.service';
import { Store } from '@ngrx/store';
import AppState from '../models/app-state.model';
import { addUser } from '../store/sign-up/sign-up.actions';
import { UsersVO } from '../models/users-vo.model';
import { addingUserSelector, currentUserSelector } from '../store/sign-up/sign-up.selectors';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: SignUpFormControls;
  signUpForm: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;
  errors = errorMessages;
  confirmValidParentMatcher = new ConfirmValidParentMatcher();
  confirmValidMatcher =  new ConfirmValidMatcher();
  currentUser$: Observable<UsersVO | null>;
  addingUser$: Observable<boolean>;
  isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private socialAuthService: SocialAuthService,
    private store: Store<AppState>,
    private router: Router) {
    this.user = new SignUpFormControls();
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
      }, { validator: CustomValidators.childrenEqual }),
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user !== null;
      console.log(this.socialUser);
    });
    this.subscribe();
  }

  /* Handle form errors */
  public errorHandling = (control: string, error: string) => {
    return this.signUpForm.controls[control].hasError(error);
  }

  onSubmit() {
    const user = new UsersVO(this.user);
    this.store.dispatch(addUser({ user }));
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  navigateToVerifyPhoneNumberPage() {
    this.router.navigate(['verify-phone-number']);
  }

  subscribe() {
    this.addingUser$ = this.store.select(addingUserSelector)
    this.addingUser$.subscribe(addingUser => {
      this.isLoading = addingUser;
    });

    this.currentUser$ = this.store.select(currentUserSelector);
    this.currentUser$.subscribe(currentUser => {
      if (currentUser?.userId) {
        this.navigateToVerifyPhoneNumberPage();
      }
    });
  }
}
