import { Injectable } from '@angular/core';


import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { DealerService } from './dealer.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dealer:any;
  auth:any;
  isAuth=false;
  constructor(private dealerService:DealerService) { }

  
  signInUser( email: string , password : string){
    const auth = getAuth();
    this.auth=auth;
    return new Promise<void>(
      (resolve , reject) => {
        signInWithEmailAndPassword(auth ,email , password).then(
          () => {
                for (let i of this.dealerService.dealers){
                  if(i.email== auth.currentUser?.email){
                    this.isAuth=true;
                    this.dealer=i;
                  }
                }
                resolve(); 
          },
          (error) => {
            reject(error.message);
          }
        );
      }
    );
  }


  signOutUser(){
    const auth = getAuth();
    auth.signOut();
  }


}


