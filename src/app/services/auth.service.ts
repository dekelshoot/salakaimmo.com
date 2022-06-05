import { Injectable } from '@angular/core';

import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { Subject } from 'rxjs';
import { Dealer } from '../models/dealer.model';
import { DealerService } from './dealer.service';
import { VisitorService } from './visitor.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dealer:any;
  auth:any;
  isAuth=false;
  authSubject= new Subject<boolean>();
  dealerSubject= new Subject<Dealer>();
  constructor(private dealerService:DealerService,
              private visitorService:VisitorService) { }

  emitAuth(){
      this.authSubject.next(this.isAuth);
  }
  emitDealer(){
    this.dealerSubject.next(this.dealer);
}
  
  signInUser( email: string , password : string){
    const auth = getAuth();
    this.auth=auth;
    return new Promise<void>(
      (resolve , reject) => {
        this.dealerService.getDealer().then(
          (dealer:any) =>{
            signInWithEmailAndPassword(auth ,email , password).then(
              () => {
                    for (let i of this.dealerService.dealers){
                      if(i.email== auth.currentUser?.email){
                        this.dealer=i;
                      }
                    }
                    this.isAuth=true;
                    this.visitorService.saveAndDecrementVisitors();
                    this.visitorService.emitVisitor(); 
                    this.emitAuth();
                    this.emitDealer();
                    resolve(); 
              },
              (error) => {
                reject(error.message);
              }
            );
          }
        )
        
      }
    );
  }

  getSession(){
    this.dealerService.getDealer().then(
      (dealers:any)=>{
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            if(auth.currentUser != null){
              for (let i of this.dealerService.dealers){
                if(i.email== auth.currentUser?.email){
                  this.dealer=i;
                }
              }
              this.isAuth=true;
              this.visitorService.saveAndDecrementVisitors();
              this.visitorService.emitVisitor()
              this.emitAuth();
              this.emitDealer();
              this.emitDealer();
            }else{
              // console.log("déconnecter")
            }
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
          });
      }
    )
   
  }


  signOutUser(){
    const auth = getAuth();
    auth.signOut();
    this.isAuth=false;
    this.emitAuth();
    this.emitDealer();
  }


}


