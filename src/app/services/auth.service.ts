import { Injectable, OnInit } from '@angular/core';
import { getAuth, signOut, updateProfile, setPersistence, signInWithEmailAndPassword, createUserWithEmailAndPassword, browserSessionPersistence, browserLocalPersistence } from "firebase/auth";
import { Subject } from 'rxjs';
import { Dealer } from '../models/dealer.model';
import { User } from '../models/user.model';
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { EventTypes } from '../models/event-types';
import { ToastService } from './toast.service';
import { FirebaseConfigService } from './firebase-config.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  dealer: any;
  auth: any;
  isAuth: boolean = false;
  authSubject = new Subject<boolean>();
  dealerSubject = new Subject<Dealer>();
  constructor(private toastService: ToastService,
    private firebaseConfigService: FirebaseConfigService) { }

  emitAuth() {
    this.authSubject.next(this.isAuth);
  }
  emitDealer() {
    this.dealerSubject.next(this.dealer);
  }

  signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.isAuth = false;
      localStorage.removeItem("salakaImmoDataUser");
      this.emitAuth()
      auth.signOut();
    }).catch((error) => {
      // An error happened.
    });
  }


  signInUser(email: string, password: string) {
    const auth = getAuth();
    this.auth = auth;
    return new Promise<any>(
      (resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password).then(
          (auth) => {
            localStorage.setItem('salakaimmouser', auth.user.uid);
            this.isAuth = true;
            this.emitAuth();
            // this.getSession()
            resolve("connexion réussit")
          },
          (error) => {
            reject(error.code);
          }
        );
      }
    )
  }


  creatNewUser(user: User) {
    const app = this.firebaseConfigService.app
    const db = getFirestore(app);
    return new Promise<any>(
      (resolve, reject) => {
        setDoc(doc(db, "dealers", user.id), {
          id: user.id,
          name: user.name,
          email: user.email,
          photo: user.photo,
          phoneNumber: user.phoneNumber,
          poste: user.poste
        }).then(() => {
          localStorage.setItem('salakaimmouser', user.id);
          resolve("user created successfully")
        }).catch((error) => {
          reject(error);
        })
      })

  }

  updateUserProfile(user: User) {
    const auth: any = getAuth();
    updateProfile(auth.currentUser, {
      displayName: user.name, photoURL: user.photo
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
  }

  signUp(user: User) {
    const auth = getAuth();
    this.auth = auth;
    return new Promise<any>(
      (resolve, reject) => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, user.email, user.password)
          .then((userCredential) => {
            // Signed in
            // const userCredential = userCredential.user;
            user.id = userCredential.user.uid;
            this.creatNewUser(user).then((result) => {
              this.isAuth = true;
              resolve(userCredential.user)
            }).catch((error) => {
              reject(error)
            });
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            reject(error)
            // ..
          });

      }
    );
  }

  getSingleDealer(id: any) {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const auth = getAuth();
      const db = getFirestore(app);
      const docRef = doc(db, "dealers", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.dealer = docSnap.data();
        resolve(docSnap.data());
      } else {
        reject("le vendeur n'existe pas")
      }
    });
  }

  getSession() {
    if (localStorage.getItem("salakaimmouser") != null) {
      const auth = getAuth();
      setPersistence(auth, browserLocalPersistence)
        .then(() => {

          this.isAuth = true;
          this.emitAuth();
          this.toastService.showToast(EventTypes.Success, "Etat", "vous êtes connecté")
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          this.toastService.showToast(EventTypes.Error, "Etat", "Echec de connexion")
          localStorage.removeItem("salakaimmouser")
        });
    }
  }


}


