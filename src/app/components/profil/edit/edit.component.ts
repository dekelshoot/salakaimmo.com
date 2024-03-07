import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventTypes } from 'src/app/models/event-types';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { RouterService } from 'src/app/services/router.service';
import { ToastService } from 'src/app/services/toast.service';
import { DealerService } from '../../../services/dealer.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm!: FormGroup;
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
  dealer!: any;
  id!: any;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private routerService: RouterService, private dealerService: DealerService, private toastService: ToastService) { }

  ngOnInit(): void {
    if (localStorage.getItem("salakaimmouser") != null) {
      this.id = localStorage.getItem("salakaimmouser")
    } else {
      this.routerService.route("/menu")
    }

    document.getElementById('head')?.scrollIntoView();
    this.routerService.setRoute("/edit");
    document.getElementById("head")?.scrollIntoView();
    let data: any = this.authService.dealer;
    console.log(data);
    this.initForm();
    this.editForm?.setValue({
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
    });
    console.log(this.editForm)
  }
  onSubmit() {
    const user = new User();
    this.loading = true;
    this.start = true;
    this.error = false;
    this.success = false;
    user.email = this.editForm.get('email')?.value;
    user.name = this.editForm.get('name')?.value;
    user.phoneNumber = this.editForm.get('phoneNumber')?.value;
    console.log(user)
    this.dealerService.updateProfile(user, this.id).then(() => {
      this.error = false;
      this.start = false;
      this.success = true,
        this.loading = false;
      this.toastService.showToast(EventTypes.Success, "Success", "Modification réussit :)")
      this.routerService.route('/accueil')
      this.routerService.route("/profil")
    }).catch((err) => {
      this.loading = false;
      this.success = false;
      this.error = true
      this.toastService.showToast(EventTypes.Error, "Warning", "une erreur est survenue")
    })
  }

  initForm() {
    this.editForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required]],
    });
  }

  zindex() {
    return -10000
  }



}
