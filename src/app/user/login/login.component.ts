import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { LocalStorageStrategy } from 'src/app/core/store/local-storage-strategy';
import { SessionStorageStrategy } from 'src/app/core/store/session-storage-strategy';
import { environment } from './../../../environments/environment'
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup = new FormGroup({})
  public showPassword: boolean = false

  public stayConnected: boolean = environment.storage.auth.strategy !== 'session'

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    const loginControl: AbstractControl = new FormControl('Lemaire.Aldegonde', [Validators.required])
    const passwordControl: AbstractControl = new FormControl('GfNScUbIzt6VJzZEtfgH', [Validators.required])

    this.form.addControl('login', loginControl)
    this.form.addControl('password', passwordControl)
  }

  passwordToggle(): void {
    this.showPassword = !this.showPassword
    if (this.showPassword) {
      setTimeout(() => this.showPassword = false, 800)
    }
  }

  changeStrategy(): void {
    console.log('stayConnected was changed')
    if (this.stayConnected) {
      this._userService.storageStrategy = new LocalStorageStrategy()
    } else {
      this._userService.storageStrategy = new SessionStorageStrategy()
    }
  }

  onSubmit(): void {

    this._userService.authenticate(this.form.value)
      .subscribe({
        next: (response: HttpResponse<any>) => {
          this._router.navigate(['/'])
        },
        error: (error: any) => {},
        complete: () => {
          this.form.controls['login'].setValue('')
          this.form.controls['password'].setValue('')
        }
      })
  }
}
