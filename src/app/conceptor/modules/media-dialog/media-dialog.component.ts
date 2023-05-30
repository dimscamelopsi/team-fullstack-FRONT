import { Component, Inject, OnInit } from '@angular/core';
import { MediaService } from '../services/media.service';
import { MediaType } from 'src/app/course/types/media-type';
import { take } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


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
    public dialogRef: MatDialogRef<MediaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) { }

  ngOnInit(): void {
    // Fetch all medias
    this._mediaService.findAllMedias()
      .pipe(
        take(1)
      )
      .subscribe((response: any) => {
        this.medias = response
      })
  }

  /**
  * Close the dialog without selecting any media.
  */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
    * Add a media to the dialog and close it.
    * @param media The selected media
    */
  public addMedia(media: MediaType): void {
    //console.log('ok');
    this.media = media
    //this.medias.push(this.media =media)
    this.dialogRef.close(this.media)
  }

}
