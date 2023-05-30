import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  /**
 * BehaviorSubject to hold the user data.
 */
  public user$: BehaviorSubject<any | undefined>;
  /**
 * User object.
 */
  public user: any;

  constructor(private _userService: UserService, private _router: Router) {
    // Initialize the user$ BehaviorSubject with the user data from the UserService.
    this.user$ = this._userService.user$;
  }

  ngOnInit(): void {
    // Subscribe to the user$ BehaviorSubject to get the latest user data.
    this._userService.user$.subscribe((_user: any) => {
      // Update the user object with the latest user data.

      this.user = _user;
    });
  }


  /**
   * Logs out the user.
   */
  logout(): void {
    // Call the logout method of the UserService to log out the user.
    this._userService.logout();

    // Navigate to the user page after logout.
    this._router.navigate(['/', 'user']);
  }
}
