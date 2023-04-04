import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({})
  public showPassword: boolean = false

  constructor() { }

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

}
