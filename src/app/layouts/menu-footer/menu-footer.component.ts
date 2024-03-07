import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-menu-footer',
  templateUrl: './menu-footer.component.html',
  styleUrls: ['./menu-footer.component.scss']
})
export class MenuFooterComponent implements OnInit {

  rout!: string;
  constructor(public router: Router, public routerService: RouterService) { }

  ngOnInit(): void {
    this.rout = this.router.url;
    console.log(this.rout);
  }

}
