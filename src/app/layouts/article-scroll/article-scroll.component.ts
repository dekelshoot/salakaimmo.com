import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-article-scroll',
  templateUrl: './article-scroll.component.html',
  styleUrls: ['./article-scroll.component.scss']
})
export class ArticleScrollComponent implements OnInit {
  articles!: Array<any>;
  carouselWeb = {
    cellsToScroll: 2.5,
    cellsToShow: 3.5,
    autoplay: false,
    autoplayInterval: 4000,
    pauseOnHover: true,
    height: 370,
    margin: 10,
    arrowsOutside: false,
    arrowsTheme: 'dark',
  };
  carouselMobile = {
    cellsToScroll: 2,
    cellsToShow: 2,
    autoplay: false,
    autoplayInterval: 4000,
    pauseOnHover: true,
    height: 280,
    margin: 10,
    arrowsOutside: false,
    arrowsTheme: 'dark',
  };
  @Input() data: object | any;

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }


}
