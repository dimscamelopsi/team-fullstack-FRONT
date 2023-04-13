import { Component, Inject, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { MediaType } from 'src/app/course/types/media-type';
import { take } from 'rxjs';
import { ModuleType } from '../../types/module-type';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddModuleComponent } from '../../add-module/add-module.component';

@Component({
  selector: 'app-media-dialog',
  templateUrl: './media-dialog.component.html',
  styleUrls: ['./media-dialog.component.scss']
})
export class MediaDialogComponent implements OnInit {
  public medias: Array<MediaType> = []
  public media!: MediaType


  constructor(
    private _mediaService: MediaService,
    //public dialogRef: MatDialogRef<AddModuleComponent>,
    //@Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
    this._mediaService.findAllMedias()
    .pipe(
      take(1)
    )
    .subscribe((response: any) => {
      this.medias = response
    })
  }
  /*public addMedia(media: MediaType): void {
    this.media = media
    this.dialogRef.close(this.media)
  }*/

}
