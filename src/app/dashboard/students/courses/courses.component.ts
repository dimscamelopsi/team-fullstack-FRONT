import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { CourseService } from 'src/app/course/services/course.service';
import { CourseListType } from 'src/app/course/types/course-list-type';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  public courses: Array<CourseListType> = [];

  constructor(private _courseService: CourseService) {}

  ngOnInit(): void {
    this._courseService
      .findUsersCourses()
      .pipe(take(1))
      .subscribe((response: CourseListType[]) => {
        this.courses = response;
      });
  }
}
