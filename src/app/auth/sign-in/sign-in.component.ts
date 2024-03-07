import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterService } from 'src/app/services/router.service';
import { AuthService } from 'src/app/services/auth.service';
import { EventTypes } from 'src/app/models/event-types';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm!: FormGroup;
  errorMessage!: string;
  loading = false;
  success = false;
  error = false;

  EventTypes = EventTypes;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private routerService: RouterService, private toastService: ToastService) { }

  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.routerService.setRoute("/auth/sign-in");
    document.getElementById("head")?.scrollIntoView();
    this.initForm();
  }
  onSubmit() {
    this.loading = true;
    this.error = false;
    this.success = false;
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;
    this.authService.signInUser(email, password).then(
      () => {
        this.error = false;
        this.success = true,
          this.loading = false;
        this.toastService.showToast(EventTypes.Success, "Success", "Connexion réussit :)")
        this.routerService.route('/accueil')
      },
      (error) => {
        console.log(error)
        this.loading = false;
        this.success = false;
        this.errorMessage = error.slice("auth/".length, error.length)
        this.error = true
        this.toastService.showToast(EventTypes.Error, "Warning", this.errorMessage)
      }
    );
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }






}


