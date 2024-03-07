import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArraysService } from 'src/app/services/arrays.service';
import { RouterService } from 'src/app/services/router.service';


@Component({
  selector: 'app-slide-article',
  templateUrl: './slide-article.component.html',
  styleUrls: ['./slide-article.component.scss']
})
export class SlideArticleComponent implements OnInit {
  @Input() articles: Array<any> = [];
  placeholder = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
  constructor(public routerService: RouterService) { }

  ngOnInit(): void {

  }


}
