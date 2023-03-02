import { Component, Input, OnInit } from '@angular/core';
import { ArraysService } from 'src/app/services/arrays.service';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  @Input() articles: object | any;
  @Input() title = "";
  @Input() loader !: boolean;
  placehover = ["", "", "", "", "", "", "", "", "", ""]

  constructor(public arraysService: ArraysService,) { }

  ngOnInit(): void {
  }

}
