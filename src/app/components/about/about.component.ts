import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  hrefWa = "http://wa.me/" + "+23798684872" + "?text=je%20vous%20contacte%20depuis%20salakaimmo.com%20";
  constructor(public routerService: RouterService,) { }

  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.routerService.setRoute("/apropos");
  }
}
