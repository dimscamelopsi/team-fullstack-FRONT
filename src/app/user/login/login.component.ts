import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({})
  public showPassword: boolean = false

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    const loginControl: AbstractControl = new FormControl('', [Validators.required])
    const passwordControl: AbstractControl = new FormControl('', [Validators.required])

    this.form.addControl('login', loginControl)
    this.form.addControl('password', passwordControl)
  }

  passwordToggle(): void {
    this.showPassword = !this.showPassword
    if (this.showPassword) {
      setTimeout(() => this.showPassword = false, 800)
    }
  }

  onSubmit(): void {
    if (this._userService.authenticate(this.form.value)) {
      this._router.navigate(['/'])
    } else {
      this.form.controls['login'].setValue('')
      this.form.controls['password'].setValue('')
      // Maybe a toast, more user friendly ?
    }
  }
}
