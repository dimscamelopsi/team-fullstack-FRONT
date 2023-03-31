import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RemoveCourseDialogComponent } from '../../dialogs/remove-course-dialog/remove-course-dialog.component';
import { CourseListType } from '../../types/course-list-type';

@Component({
  selector: 'app-course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss']
})
export class CourseTileComponent implements OnInit {
  @Input() public course!: CourseListType
  @Output() public onToggleCourse: EventEmitter<CourseListType> = new EventEmitter()
  @Output() public onRemoveCourse: EventEmitter<CourseListType> = new EventEmitter()

  constructor(
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public revealOrHide(course: CourseListType): void {
    course.isSelected = !course.isSelected
    console.log(`Course was toggled : ${course.isSelected}`)
    this.onToggleCourse.emit(course)
  }

  public onRemoveClick(course: CourseListType): void {
    this._dialog.open(
      RemoveCourseDialogComponent,
      {
        width: '20em',
        height: '30em',
        data: course
      }
    ).afterClosed().subscribe((result: any) => {
      if (result !== undefined) {
        // Remove the course from the list
        this.onRemoveCourse.emit(this.course)
      }
    })
  }
}
