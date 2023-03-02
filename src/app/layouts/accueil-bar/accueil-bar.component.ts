import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArraysService } from '../../services/arrays.service';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-accueil-bar',
  templateUrl: './accueil-bar.component.html',
  styleUrls: ['./accueil-bar.component.scss']
})
export class AccueilBarComponent implements OnInit {
  icons!: Array<string>;
  categories!: Array<string>;
  constructor(public router: Router,
    public arraysService: ArraysService, public routerService: RouterService) { }

  ngOnInit(): void {
    this.icons = this.arraysService.icons;
    this.categories = this.arraysService.category2;
  }

}
