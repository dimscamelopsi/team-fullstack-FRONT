import { Component, Inject, OnInit } from '@angular/core';
import { CourseListType } from '../../types/course-list-type';
import { take } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { ManageCourseComponent } from '../../components/manage-course/manage-course.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-course-manage-dialog',
  templateUrl: './course-manage-dialog.component.html',
  styleUrls: ['./course-manage-dialog.component.scss']
})
export class CourseManageDialogComponent implements OnInit {
  public courses: Array<CourseListType> = []

  constructor(
    public dialogRef: MatDialogRef<ManageCourseComponent>,
    private _courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data: CourseListType, 
  ) { }

  ngOnInit(): void {
    this._courseService.findFullCourses()
      .pipe(take(1))
      .subscribe(
        (response: CourseListType[]) => {this.courses = response})  
      
  }

}
