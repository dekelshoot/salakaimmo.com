import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { RouterService } from './services/router.service';
import { AuthService } from './services/auth.service';
import { FirebaseConfigService } from './services/firebase-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
// @Directive({ selector: 'img' })
export class AppComponent implements OnInit {
  placeholder = ["", "", "", "", "", "", ""]
  title = 'salakaimmo';
  start = true;
  isAuth: boolean = false;
  rout!: string;
  routeSubject!: Subscription;
  chargement!: number;
  counterSubscription!: Subscription;

  // firebase hosting:channel:deploy 1
  //firebase deploy --only hosting:salakaimmo
  constructor(
    public routerService: RouterService,
    private authService: AuthService, private activatedRoute: ActivatedRoute,
    private firebaseConfigService: FirebaseConfigService) {
    this.firebaseConfigService.inti()
  }


  ngOnInit() {
    if (localStorage.getItem("salakaimmouser") != null) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
    this.routeSubject = this.routerService.routeSubject.subscribe(
      (route: string) => {
        this.rout = route;
      }
    )
    this.authService.getSession()
    setTimeout(() => {
      this.start = false;
    }, 2000);
    this.onCharge();
  }



  onCharge() {
    let counter = interval(300);
    this.counterSubscription = counter.subscribe(
      (value: number) => {
        if (value < 13) {
          this.chargement = value * 10;
        } else {
          this.ngOnDestroy();
          this.chargement = 0;
        }
      }
    )


  }
  ngOnDestroy() {
    this.counterSubscription.unsubscribe;
  }

}


