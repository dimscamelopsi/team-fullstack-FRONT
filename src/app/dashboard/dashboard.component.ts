import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  /**
   * Tiles to display in the HTML template
   */
  public tiles: Array<any> = [];

  /**
   * Specify if a "user" is admin or not (default true)
   */
  public isAdmin: boolean = true;

  constructor(private _userService: UserService) {}

  ngOnInit(): void {
    if (this._userService.user.role === 'CONCEPTEUR') {
      this.tiles.push(
        {
          title: 'Parameters',
          summary: 'Parameters management',
          image: 'assets/settings.png',
          action: ['dashboard'],
        },
        {
          title: 'Students',
          summary: 'Add, remove and view students',
          image: 'assets/graduates.png',
          action: ['/', 'student', 'list'],
        },
        {
          title: 'Courses',
          summary: 'Manage courses and medias',
          image: 'assets/course.png',
          action: ['conceptor'],
        }
      );
    }
  }
}
