import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() routeActive: string | undefined;
  isAuthSubscription!: Subscription;
  rout!: string;
  displaySearch = false;
  isAuth = false;
  constructor(public router: Router, private authService: AuthService, public routerService: RouterService,) { }

  ngOnInit(): void {
    if (localStorage.getItem("salakaimmouser") != null) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
    this.rout = this.router.url;
  }


}
