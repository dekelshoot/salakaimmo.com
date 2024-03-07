import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor(public router: Router,
    public routerService: RouterService,) { }
  rout!: string;
  start = true;
  placeholder = ["", "", "", "", "", "", ""]
  routeSubject!: Subscription;
  ngOnInit() {
    this.initRoute()
    this.routeSubject = this.routerService.routeSubject.subscribe(
      (route: string) => {
        this.rout = route;
        console.log(this.rout);
      }
    )
    console.log(this.rout);
    this.rout = '/side'
  }

  initRoute() {
    let route = this.router.url.split('/')[1]
    this.routerService.setRoute(route);
  }
}
