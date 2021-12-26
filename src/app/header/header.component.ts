import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  deferredPrompt:any;
  addBtn = document.getElementById('.add-button');
  // addBtn.style.display = 'none';
  isAuth = false;
  start = false;
  header=false;

  constructor(private authService: AuthService,
              private router: Router
  ) { }

  ngOnInit(): void {

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });

    window.addEventListener('scroll',()=>{
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
      if(scrollTop>300){
       this.header=true;
      }
      if(scrollTop<200){
       this.header=false;
      }
    })

  }

  naviger(route:string){
    this.start = true;
    setTimeout(
      ()=>{
        this.start = false;
        this.router.navigate( [route]);
      },1000
    )
  }

  onSignOut(){
    this.start = true;
    setTimeout(
      ()=>{
        this.start = false;
        this.authService.signOutUser();
      },1000
    )
  }

  onBack(){
    this.router.navigate( ['/accueil'])
  }



}
