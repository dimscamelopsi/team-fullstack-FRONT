import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /**
   * Tiles to display in the HTML template
   */
  public tiles: Array<any> = []

  /**
   * Specify if a "user" is admin or not (default true)
   */
  public isAdmin: boolean = true

  constructor(
  ) { }

  ngOnInit(): void {
    this.tiles.push({
      title: 'Parameters',
      summary: 'Parameters management',
      action: ['dashboard']
    },
    {
      title: 'Students',
      summary: 'Add, remove, view students',
      action: ['/', 'student', 'list']
    },
    {
      title: 'Courses',
      summary: 'Manage courses and medias',
      action: ['conceptor']
    })
  }
}
