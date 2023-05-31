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
  @Input() public manage!: boolean
  @Output() public onToggleCourse: EventEmitter<CourseListType> = new EventEmitter()
  @Output() public onRemoveCourse: EventEmitter<CourseListType> = new EventEmitter()
  @Output() public sendCourse: EventEmitter<CourseListType> = new EventEmitter()
  @Input() public showAdd!: boolean

  constructor(
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }


  /**
 * Toggle the visibility of the course.
 * @param course The course object.
 */
  public revealOrHide(course: CourseListType): void {
    course.isSelected = !course.isSelected
    this.onToggleCourse.emit(course)
  }


  /**
  * Toggle the course selection.
  * @param courseStatus The status of the course selection.
  */
  public toggle(courseStatus: boolean): void {
    this.course.isSelected = courseStatus
    this.onToggleCourse.emit(this.course)
  }


  /**
 * Open the remove course dialog and remove the course if confirmed.
 * @param course The course object.
 */
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

  /**
    * Emit the course data to be sent.
    * @param course The course object.
    */
  public addCourse(course: CourseListType): void {
    this.sendCourse.emit(this.course)
  }
}
