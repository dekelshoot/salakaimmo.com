import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ArraysService } from 'src/app/services/arrays.service';
import { RouterService } from 'src/app/services/router.service';
import { SearchService } from 'src/app/services/search.service';
import { ArticleService } from '../../../services/article.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  error = {
    title: " Oups... Pas d'annonces correspondante!!!",
    errorMessage: " Désolé, nous n'avons pas encore d'annonce correspondante à cette recherche.",
    instruction: "Veuillez réessayer avec d'autres paramètres.",
    rout: "/article/recherche"
  }
  searchActive = "";
  articles: Array<any> = [];
  category!: Array<string>;
  lieu!: Array<string>;
  prix!: Array<string>;
  chambre!: Array<string>;
  query = "";
  result = true;
  loader = true;
  throttle = 0;
  distance = 2;
  page = 1;
  queryParams!: any;
  constructor(public arraysService: ArraysService,
    private routerService: RouterService,
    private activatedRoute: ActivatedRoute,
    private searchService: SearchService,
    private formBuilder: FormBuilder,
    private articleService: ArticleService) { }


  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.routerService.setRoute("/article/recherche");
    let queryParams: any = this.activatedRoute.snapshot.queryParams;
    queryParams = {
      ...queryParams,
      startPrice: this.getPrice(queryParams?.prix)[0],
      endPrice: this.getPrice(queryParams?.prix)[1],
    }
    this.queryParams = queryParams;
    this.articleService.getArticleByQuery(queryParams).then(
      (data: any) => {
        this.articles = data;
        document.getElementById("head")?.scrollIntoView();
        if (data.length > 0) {
          this.result = true;
        } else {
          this.result = false;
        }
        this.loader = false;
        console.log(data)
      }

    ).catch((error) => {
      this.result = false;
      this.loader = false;
      console.log(error);
    })
    // if (queryParams.type) {
    //   if (queryParams.lieu) {
    //     if (queryParams.prix) {
    //       if (queryParams.chambre) {

    //       } else {

    //       }
    //     } else {

    //     }
    //   } else {

    //   }
    // } else {

    // }
    this.searchActive = this.searchService.searchActive;
    this.routerService.setRoute("/article/recherche/query");
    this.category = this.arraysService.category2;
    this.lieu = this.arraysService.lieu;
    this.prix = this.arraysService.prix;
    this.chambre = this.arraysService.chambre;
  }

  getPrice(data: any) {
    let prix = data.slice(0, 1)
    if (prix == "0") {
      return [0, 50000]
    } else if (prix == "5") {
      return [50000, 150000]
    } else if (prix == "1") {
      return [150000, 300000]
    } else if (prix == "3") {
      return [300000, 500000]
    } else if (prix == ">") {
      return [500000,]
    } else {
      return []
    }

  }

  onScroll(): void {
    console.log("scroll")
    this.loader = true;
    this.articleService.getNextPageBySearch(this.queryParams).then(
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

}
