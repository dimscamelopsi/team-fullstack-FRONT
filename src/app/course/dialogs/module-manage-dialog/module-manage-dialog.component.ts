import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseManageType } from '../../types/course-manage-type';
import { ManageCourseComponent } from '../../components/manage-course/manage-course.component';

@Component({
  selector: 'app-module-manage-dialog',
  templateUrl: './module-manage-dialog.component.html',
  styleUrls: ['./module-manage-dialog.component.scss']
})
export class ModuleManageDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ManageCourseComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CourseManageType, 
    ) { }

  ngOnInit(): void {
  }

}
