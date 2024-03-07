import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DealerService } from 'src/app/services/dealer.service';
import { FileService } from 'src/app/services/file.service';
import { RouterService } from 'src/app/services/router.service';
import { ToastService } from 'src/app/services/toast.service';
import { EventTypes } from 'src/app/models/event-types';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  loadingDealer = true;
  dealer!: any;
  isAuth: boolean = false;
  urls = new Array<string>();
  fileUploading = false;
  fileUrl = new Array<string>();
  id!: any;
  constructor(public routerService: RouterService, private authService: AuthService, private toastService: ToastService,
    private dealerService: DealerService,
    private fileService: FileService,) { }


  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.routerService.setRoute("/profil");
    if (localStorage.getItem("salakaimmouser") != null) {
      this.isAuth = true;
      console.log(localStorage.getItem("salakaimmouser"))
      let id = localStorage.getItem("salakaimmouser")
      this.id = id;
      this.authService.getSingleDealer(id).then(
        (data: any) => {
          this.dealer = data;
          this.loadingDealer = false;
          document.getElementById("head")?.scrollIntoView();
        }
      ).catch((error: any) => {
        this.loadingDealer = false;
      })
    } else {
      this.loadingDealer = false;
      this.isAuth = false;
    }

  }


  //uploader les images dans la base de donnee
  onUploadFile(file: File, i: number) {
    this.fileUploading = true;
    this.fileService.uploadFile(file, "images").then(
      (url: any) => {
        this.fileUrl = []
        this.fileUrl.push(url);
        console.log(this.fileUrl)
        this.dealerService.updateProfilePicture({ photo: this.fileUrl[0] }, this.id).then(
          () => {
            this.dealer.photo = this.fileUrl[0]
            this.toastService.showToast(EventTypes.Success, "Success", "Modification réussit :)")
            this.fileUploading = false;
          }
        ).catch(() => {
          this.toastService.showToast(EventTypes.Error, "Warning", "une erreur est survenue")
          this.fileUploading = false;
        })
      }
    )

  }

  //detecter les images selectionnes par l'utilisateur
  detectFiles(event: any) {
    let files = event.target.files;
    let i = 0;
    if (files) {
      for (let file of files) {
        this.onUploadFile(file, i);
      }
    }

  }


}
