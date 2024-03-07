import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterService } from 'src/app/services/router.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { FileService } from 'src/app/services/file.service';
import { ToastService } from 'src/app/services/toast.service';
import { EventTypes } from 'src/app/models/event-types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  errorMessage!: string;
  loading = false;
  start = false;
  success = false;
  error = false;
  modal = true;
  url: string = ""
  fileUploading = false;
  fileUploaded = false;
  charge = 5;
  fileUrl!: string;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private routerService: RouterService, private fileService: FileService, private toastService: ToastService) { }

  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.routerService.setRoute("/auth/sign-in");
    document.getElementById("head")?.scrollIntoView();
    this.initForm();
  }
  onSubmit() {
    const user = new User();
    this.loading = true;
    this.start = true;
    this.error = false;
    this.success = false;
    user.email = this.signUpForm.get('email')?.value;
    user.name = this.signUpForm.get('name')?.value;
    user.password = this.signUpForm.get('password')?.value;
    user.phoneNumber = this.signUpForm.get('phoneNumber')?.value;
    user.poste = "Digital manager"
    if (this.fileUrl) {
      user.photo = this.fileUrl;
    }
    this.authService.signUp(user).then((user) => {
      this.error = false;
      this.start = false;
      this.success = true,
        this.loading = false;
      this.toastService.showToast(EventTypes.Success, "Success", "Création réussit :)")
      this.routerService.route('/accueil')
      // localStorage.setItem("salakaImmoDataUser", JSON.stringify(user))
    }, (error) => {
      this.start = false;
      this.loading = false;
      this.success = false;
      this.errorMessage = error.message;
      this.errorMessage = this.errorMessage.slice("Firebase: Error (auth/".length, this.errorMessage.length)
      this.errorMessage = this.errorMessage.slice(0, this.errorMessage.length - 2)
      this.error = true
      this.toastService.showToast(EventTypes.Error, "Warning", this.errorMessage)
    })

  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      password2: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      photo: ['', Validators.required],
      phoneNumber: ['', [Validators.required]],
    });
  }

  zindex() {
    return -10000
  }


  //uploader les images dans la base de donnee
  onUploadFile(file: File) {
    this.fileUploading = true;
    this.fileService.uploadFile(file, "profils").then(
      (url: any) => {
        this.fileUrl = url;
        this.charge = 100;
        setTimeout(
          () => {
            this.fileUploading = false;
            this.fileUploaded = true;
          }, 2000
        )
      }
    )
  }


  //detecter les images selectionnes par l'utilisateur
  detectFiles(event: any) {
    let file = event.target.files;
    let i = 0;
    if (file) {
      this.onUploadFile(file[0]);
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.url = e.target.result;
      }
      reader.readAsDataURL(file[0]);
      i++;
    }
  }



}
