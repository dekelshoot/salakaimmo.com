import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleService } from '../../services/article.service';

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

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private articleService:ArticleService) { }

  ngOnInit(): void {
    this.articleService.start=false;
    this.articleService.emitStart()
    this.initForm();
  }

  onSubmit(){
    this.start = true;
    const email = this.signInForm.get('email')?.value;
    const password = this.signInForm.get('password')?.value;
    this.loading = true;
        this.authService.signInUser(email, password).then( 
          () => {
            setTimeout(
              ()=>{
                this.start = false;
                this.router.navigate( ['/accueil']);
              },1500
            )
          },
          (error) =>{
            this.start = false;
            this.errorMessage = error;
           this.errorMessage=this.errorMessage.slice("Firebase: Error (auth/".length,this.errorMessage.length)
           this.errorMessage = this.errorMessage.slice(0,this.errorMessage.length-2)
            console.log(this.errorMessage)
            this.loading = false;
          }
        );
  }

  initForm(){
    this.signInForm = this.formBuilder.group( {
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
}
             
onBack(){
  this.router.navigate( ['/accueil']);

}

}
