import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CourseListType } from '../../types/course-list-type';

@Component({
  selector: 'app-remove-course-dialog',
  templateUrl: './remove-course-dialog.component.html',
  styleUrls: ['./remove-course-dialog.component.scss']
})
export class RemoveCourseDialogComponent implements OnInit {

  public closeMessage: any = {doRemove: true}

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CourseListType,
    public dialogRef: MatDialogRef<RemoveCourseDialogComponent>,
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close()
  }

}
