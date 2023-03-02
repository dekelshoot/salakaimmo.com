import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArraysService } from '../../services/arrays.service';
import { RouterService } from '../../services/router.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../../services/auth.service';
import { DealerService } from '../../services/dealer.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  articles!: Array<any>;
  article!: any;
  isAuthSubscription!: Subscription;
  isAuth: boolean = false;
  color!: string[];
  dealer!: any;
  dealers!: any;
  loadingDealer = true;
  loadingDealers = true;
  placeholder = ["", "", "", "", ""]
  constructor(private arraysService: ArraysService,
    public routerService: RouterService, private authService: AuthService,
    private dealerService: DealerService,) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.routerService.setRoute("/menu");
    if (localStorage.getItem("salakaimmouser") != null) {
      this.isAuth = true;
      console.log(localStorage.getItem("salakaimmouser"))
      let id = localStorage.getItem("salakaimmouser")
      this.authService.getSingleDealer(id).then(
        (data: any) => {
          this.dealer = data;
          this.loadingDealer = false;
        }
      ).catch((error: any) => {
        this.loadingDealer = false;
      })
    } else {
      this.loadingDealer = false;
      this.isAuth = false;
    }


    this.dealerService.getAllDealers().then(
      (data: any) => {
        this.dealers = data;
        this.loadingDealers = false;
      }
    ).catch((error: any) => {
      this.loadingDealers = false;
    })
  }

  signOut() {
    this.authService.signOut();
    this.isAuth = false;
    this.dealer = null
    localStorage.removeItem("salakaimmouser")
  }


}
