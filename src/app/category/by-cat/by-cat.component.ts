import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { ArraysService } from 'src/app/services/arrays.service';
import { ArticleService } from 'src/app/services/article.service';
import { RouterService } from '../../services/router.service';
@Component({
  selector: 'app-by-cat',
  templateUrl: './by-cat.component.html',
  styleUrls: ['./by-cat.component.scss'],
})
export class ByCatComponent implements OnInit {
  error = {
    title: "Oups... Pas d'annonces correspondante!!!",
    errorMessage: " Désolé, nous n'avons pas encore d'annonce correspondante à cette recherche.",
    instruction: "Veuillez réessayer avec d'autres paramètres.",
    rout: "/article/categories"
  }
  categorySubscription!: Subscription;
  result = true;
  category = '';
  placeholder = ['', '', ''];
  placeholder2 = ['', ''];
  lieu!: string[];
  articles: Article[] = [];
  articless: Article[] = [];
  dateForm!: FormGroup;
  lieuForm!: FormGroup;
  prixForm!: FormGroup;
  filter = 'date';
  loader = false;
  throttle = 0;
  distance = 2;
  page = 1;
  constructor(
    private routes: ActivatedRoute,
    public routerService: RouterService,
    private articleService: ArticleService,
    private array: ArraysService,
  ) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.lieu = this.array.location
    this.getCategorie();
    this.articleService.getArticleByCategory(this.category).then(
      (data: any) => {
        if (data.length > 0) {
          this.result = true;
        } else {
          this.result = false;
        }
        this.articles = data
        console.log(data)
      }, (error: any) => {
        console.log(error)
      }
    )
  }

  onScroll(): void {
    console.log("scroll")
    this.loader = true;
    this.articleService.getNextPageByCat(this.category).then(
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
    this.category = cat;
  }
}
