import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm! : FormGroup; 
  errorMessage!: string;
  loading = false;
  start = false;
  success=false;
  error = false;
  modal =true;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
            ) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.initForm();
  }

  onSubmit(){
    this.start = true;
    this.error=false;
    this.success=false;
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;
        this.authService.signInUser(email, password).then( 
          () => {
            this.error=false;
            this.start = false;
            this.success=true
            this.modal=false;
          },
          (error) =>{
           this.start = false;
           this.success= false;
           this.errorMessage = error;
           this.errorMessage=this.errorMessage.slice("Firebase: Error (auth/".length,this.errorMessage.length)
           this.errorMessage = this.errorMessage.slice(0,this.errorMessage.length-2)
            this.error=true
          }
        );
  }

  initForm(){
    this.signInForm = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
}

zindex(){
  return -10000
}

route(route:string){
  this.router.navigate([route]);
}


}
