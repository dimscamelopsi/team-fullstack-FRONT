import { Component, OnInit } from '@angular/core';
import { MediaService } from '../../services/media.service';
import { MediaType } from 'src/app/course/types/media-type';
import { take } from 'rxjs';
import { ModuleType } from '../../types/module-type';

@Component({
  selector: 'app-media-dialog',
  templateUrl: './media-dialog.component.html',
  styleUrls: ['./media-dialog.component.scss']
})
export class MediaDialogComponent implements OnInit {
  public medias: Array<MediaType> = []

  constructor(
    private _mediaService: MediaService
  ) { }

  ngOnInit(): void {
  }

}
