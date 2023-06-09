import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: BehaviorSubject<any | undefined>
  public user: any

  constructor(
    private _userService: UserService,
    private _router: Router
  ) {
    this.user$ = this._userService.user$
  }

  ngOnInit(): void {
    this._userService.user$
      .subscribe((_user: any) => {
        this.user = _user
      })
  }

  logout(): void {
    this._userService.logout()
    this._router.navigate(['/', 'user'])
  }
}
