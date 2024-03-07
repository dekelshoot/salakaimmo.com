import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() routeActive: string | undefined;

  rout!: string;
  displaySearch = false;
  constructor(public router: Router, public routerService: RouterService,) { }

  ngOnInit(): void {
    this.rout = this.router.url;
    console.log(this.rout);
  }




}
