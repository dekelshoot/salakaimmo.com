import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { v4 as uuidv4 } from 'uuid';
import { VisitorService } from '../services/visitor.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  authSubscription! : Subscription;
  isAuth!:boolean;
  loading = false;
  start = false;
  success=false;
  visitorsSubject!: Subscription;
  visitors!:number;
  constructor( private router: Router,
                private authService:AuthService,
                private visitorService:VisitorService,) { }

  ngOnInit(): void {
    // console.log(uuidv4().replace(/-/g,""))
    this.authSubscription = this.authService.authSubject.subscribe(
       (isAuth:boolean) =>{
         this.isAuth=isAuth
       }
    );

    this.visitorsSubject = this.visitorService.visitorSubject.subscribe(
      (visitors:number) =>{
        this.visitors = visitors

      }
    );

    this.authService.emitAuth()
    this.visitorService.getVisitors();
    this.visitorService.emitVisitor();
  }

  signOut(){
    this.start=true;
    setTimeout(() => {
      this.start=false;
      this.success=true;
      this.authService.signOutUser();
      this.authService.emitAuth()
    }, 2000);
  }

  
  route(route:string){
    this.router.navigate([route]);
  }


}
