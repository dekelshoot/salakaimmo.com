import { Component, OnInit } from '@angular/core';
import { ArraysService } from '../services/arrays.service';
import { RouterService } from '../services/router.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories!: string[];
  subTitle!: string[];
  icons!: string[];
  color!: string[];
  constructor(public arraysService: ArraysService,
    private routerService: RouterService) { }

  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.routerService.setRoute("/article/categories");
    this.categories = this.arraysService.category2;
    this.subTitle = this.arraysService.subTitle;
    this.color = this.arraysService.colorRgb;
  }

}
