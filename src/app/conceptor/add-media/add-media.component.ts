import { Component, Directive, OnInit , ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MediaService } from '../services/media.service';
import { ToastService } from 'src/app/core/toast.service';
import { Observable, take } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { MediaType } from 'src/app/course/types/media-type';
import { AddMediaType } from 'src/app/course/types/add-media-type';
import { ModuleService } from '../services/module.service';
import { ModuleListType } from 'src/app/course/types/media-list-type';
import { TypeMediaType } from 'src/app/course/types/type-media-type';
import { TypeMediaService } from '../services/type-media.service';
import { log } from 'console';




@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false }) fileDropEl!: ElementRef;
  public files: any[] = [];
  mediaFormGroup!: FormGroup;
  public mediaType!: MediaType[];
  public addMediaType!: AddMediaType[];
  public userModules: Array<ModuleListType> = [];
  public typeMedias: Array<TypeMediaType> = [];
  selectedOption = this.typeMedias[0];
  selectedFiles: File[] = [];
  mediaForm: any;
  selectedType: string = '';
  fileOver: boolean = false;
  formData = new FormData();




  constructor(
    private _fb: FormBuilder,
    private mediaService: MediaService,
    private _toastService: ToastService,
    private _moduleService: ModuleService,
    private _typeMediaService: TypeMediaService,

  ) { }


  ngOnInit(): void {

    this._typeMediaService.getAllTypesMedia()
      .pipe(
        take(1)
      )
      .subscribe((response: TypeMediaType[]) => {

        this.typeMedias = response

      })

    this.mediaFormGroup = this._fb.group({

      title: this._fb.control
        ("",
          [
            Validators.required,
          ]),
      summary: this._fb.control
        ("",
          [
            Validators.required,
          ]),
      duration: this._fb.control
        ("",
          [
            Validators.required,
          ]),
      url: this._fb.control
        ("",
          [
            Validators.required,

          ]),
      typeMedia: this._fb.control
        ("",
          [
            Validators.required,

          ]),
    })



  }
  public addMedia() {
/* console.log(this.mediaFormGroup.value) */
    this.mediaService.add(this.mediaFormGroup.value)
      .pipe(
        take(1)
      ).subscribe({
        next: (_response: HttpResponse<any>) => {
          const message: string = `media was added. `
          this._toastService.show(message)
          this.mediaFormGroup.reset(); // réinitialiser le formulaire
        },
        error: (_error: any) => {
          const badMessage: string = `media not added.`
          this._toastService.show(badMessage)
        }
      })
  }



  onSubmit(): void {
    // Créez un objet FormData pour envoyer les données vers le serveur
    const formData = new FormData();

    // Ajoutez chaque fichier sélectionné à l'objet FormData
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('file[]', this.selectedFiles[i], this.selectedFiles[i].name);
    }

    // Réinitialisez le formulaire
    this.mediaFormGroup.reset();

    // Réinitialisez la liste des fichiers sélectionnés
    this.selectedFiles = [];

/*     // Appelez une méthode de service pour envoyer les données vers le serveur
    this.mediaService.add(formData).subscribe(
      (response) => {
        // Traitez la réponse du serveur
      },
      (error) => {
        // Traitez l'erreur
      }
    ); */
  }



  /**
   * handle file from browsing
   */
  fileBrowseHandler(files:any) {
    this.prepareFilesList(files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }



  onFileSelect(event: any, type: string) {
    this.selectedType = type;
    if (this.selectedType === 'slide' || this.selectedType === 'document') {
      this.fileOver = true;
    }
    const files = event.target.files;

  }onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.uploadFile(files[i]);
    }
  }
  uploadFile(arg0: File) {
    throw new Error('Method not implemented.');
  }




}
