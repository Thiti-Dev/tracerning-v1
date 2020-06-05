import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', { validators: Validators.required }),
      email: new FormControl('', { validators: Validators.required }),
      password: new FormControl('', { validators: Validators.required }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, this.matchValues('password')],
      }),
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
}
