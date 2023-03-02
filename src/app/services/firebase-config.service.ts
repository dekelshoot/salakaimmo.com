import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {

  firebaseConfig = {
    apiKey: "AIzaSyBLQeYgZzaW-eztIOkhes4nyOrMf-QQ00Y",
    authDomain: "salakaimmobilier.firebaseapp.com",
    projectId: "salakaimmobilier",
    storageBucket: "salakaimmobilier.appspot.com",
    messagingSenderId: "323410410657",
    appId: "1:323410410657:web:16b89100d15f360123c4e0",
    measurementId: "G-XKFQZ1CL55"
  };

  app: any
  constructor() {
  }

  inti() {
    const app = initializeApp(this.firebaseConfig);
    this.app = app;
    const analytics = getAnalytics(app);
    console.log("initialized")
  }

  getApp() {
    return this.app;
  }
}
