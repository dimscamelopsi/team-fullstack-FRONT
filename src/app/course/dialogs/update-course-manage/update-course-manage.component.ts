import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../../components/manage-course/manage-course.component';

@Component({
  selector: 'app-update-course-manage',
  templateUrl: './update-course-manage.component.html',
  styleUrls: ['./update-course-manage.component.scss']
})
export class UpdateCourseManageComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UpdateCourseManageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
