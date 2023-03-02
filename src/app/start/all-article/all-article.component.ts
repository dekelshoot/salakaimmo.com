import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArraysService } from 'src/app/services/arrays.service';
import { ArticleService } from 'src/app/services/article.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-all-article',
  templateUrl: './all-article.component.html',
  styleUrls: ['./all-article.component.scss']
})
export class AllArticleComponent implements OnInit {
  category!: Array<string>;
  lieu!: string[];
  articles: Article[] = [];
  articless: Article[] = [];
  dateForm!: FormGroup;
  lieuForm!: FormGroup;
  prixForm!: FormGroup;
  filter = 'date';
  spinner = true;
  placeholder = ['', '', ''];
  placeholder2 = ['', ''];
  windows: any;
  loader = false;
  throttle = 0;
  distance = 2;
  page = 1;

  constructor(
    private routes: ActivatedRoute,
    private array: ArraysService,
    private articlesService: ArticleService,
    public routerService: RouterService

  ) { }

  ngOnInit(): void {
    console.log("onInit")
    document.getElementById("head")?.scrollIntoView();
    this.lieu = this.array.location
    this.articlesService.getAllArticle().then(
      (data: any) => {
        this.loader = false;
        this.articles = data
      }, (error: any) => {
        console.log(error)
      }
    )
  }


  onScroll(): void {
    console.log("scroll")
    this.loader = true;
    this.articlesService.getNextPage().then(
      (data: any) => {
        this.loader = false;
        this.articles.push(...data)
        console.log(this.articles)
      }, (error: any) => {
        this.loader = false;
        console.log(error)
      }
    )
  }




  rideUp(id: string) {
    document.getElementById(id)?.scrollIntoView();
  }



  getCategorie() {
    let cat = this.routes.snapshot.params['cat'];
    cat = cat.split('-').join(' ');
    console.log(cat);
    this.category = cat;
  }
}
