import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { RegisterCredential, ErrorRender } from './registration.model';
import { AuthService } from '../auth.service';

import { ClrLoadingState } from '@clr/angular';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  errors: ErrorRender = {};
  blackListedEmail: string[] = [];
  isLoading: ClrLoadingState = ClrLoadingState.DEFAULT;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', { validators: Validators.required }),
      email: new FormControl('', {
        validators: [
          Validators.required,
          (control) => {
            if (
              this.errors.email ||
              this.blackListedEmail.includes(control.value)
            )
              return { duplicatedEmail: true };
            return null;
          },
        ],
      }),
      password: new FormControl('', { validators: Validators.required }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, this.matchValues('password')],
      }),
    });

    this.form.controls.email.valueChanges.subscribe((): void => {
      if (this.errors.email) {
        this.errors.email = false;
        this.form.controls.confirmPassword.updateValueAndValidity();
      }
    });

    this.form.controls.password.valueChanges.subscribe((): void => {
      this.form.controls.confirmPassword.updateValueAndValidity();
    });
  }

  public matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { notIsMatching: true };
    };
  }

  getErrorList(errorObject: Object) {
    if (errorObject) {
      return Object.keys(errorObject);
    } else {
      return [];
    }
  }

  setDuplicateEmailError() {
    this.blackListedEmail.push(this.form.value.email); // push current email to the black listed one
    this.errors.email = 'This email is already exist';
    this.form.controls.email.updateValueAndValidity();
  }

  //
  // ─── MAIN ───────────────────────────────────────────────────────────────────────
  //
  formSubmitHandler() {
    // Prevent further process if the form isn't valid
    if (this.form.invalid) {
      return;
    }
    // Destructuring
    const { email, password, username } = this.form.value;
    const registrationRequestBody: RegisterCredential = {
      email,
      password,
      username,
    };
    this.isLoading = ClrLoadingState.LOADING;
    this.authService
      .API_REGISTER(registrationRequestBody)
      .subscribe(
        (res) => {
          //Successfully Registered
          setTimeout(() => {
            this.router.navigateByUrl('/login');
          }, 500);
        },
        (err) => {
          if (err.error.code === 1) {
            console.log('This email already existed');
            this.setDuplicateEmailError();
          }
        }
      )
      .add(() => {
        this.isLoading = ClrLoadingState.SUCCESS;
        console.log('done');
      });
  }
  // ────────────────────────────────────────────────────────────────────────────────
}
