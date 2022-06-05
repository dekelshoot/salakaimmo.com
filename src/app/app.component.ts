import { Component, OnInit } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ArticleService } from './services/article.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { VisitorService } from './services/visitor.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ETS-Salaka';
  start = true;
  startSubject!: Subscription;
  visitorsSubject!: Subscription;
// firebase hosting:channel:deploy 1
  constructor(private articleService: ArticleService,
              private auth: AuthService,
              private visitorService:VisitorService,) {

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
    this.auth.getSession()
   this.articleService.initStart()
    this.startSubject = this.articleService.startSubject.subscribe(
      (start:boolean) =>{
        this.start = start
      }
    );
    this.visitorService.getVisitors().then(
      ()=>{
        this.visitorService.saveAndIncrementVisitors();
      }
    )
}
}
