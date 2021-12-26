import { Component, OnInit } from '@angular/core';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import firebase from "firebase/app";
// import 'firebase/storage';
// import 'firebase/analytics';
// import "firebase/auth";
// import "firebase/firestore";
import { ArticleService } from './services/article.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { VisitorService } from './services/visitor.service';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'ETS-Salaka';
  start = true;
  startSubject!: Subscription;
  visitorsSubject!: Subscription;

  constructor(private articleService: ArticleService,
              private visitorService:VisitorService,
              private auth: AuthService) {

    const firebaseConfig = {
      apiKey: "AIzaSyAzS0CDBp8wZAq8yPxhGqG3SajqHDYYH3U",
      authDomain: "ets-salaka-c6edb.firebaseapp.com",
      projectId: "ets-salaka-c6edb",
      storageBucket: "ets-salaka-c6edb.appspot.com",
      messagingSenderId: "1035844336898",
      appId: "1:1035844336898:web:3efaf2f7124910bec4161b",
      measurementId: "G-KTRYQNVZHQ"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

   }

  ngOnInit(): void {
    this.articleService.initStart()
    this.visitorService.getVisitors().then(
      ()=>{
        this.visitorService.saveAndIncrementVisitors();
      }
    )
    this.startSubject = this.articleService.startSubject.subscribe(
      (start:boolean) =>{
        this.start = start
      }
    );

  }
}
