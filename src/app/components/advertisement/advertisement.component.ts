import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {
  articles: Array<any> = [];
  result = true;
  loader = false;


  error = {
    title: " Oups... Pas d'annonces !!!",
    errorMessage: " Vous n'avez pas encore d'annonce sur notre site.",
    instruction: "Veuillez publier une annonce. ",
    rout: "/article/new"
  }
  constructor(
    private articleService: ArticleService,
    public routerService: RouterService

  ) { }


  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.articleService.getArticleByUser().then(
      (data: any) => {
        this.articles = data;
        if (data.length > 0) {
          this.result = true;
        } else {
          this.result = false;
        }
        console.log(data)
      }

    ).catch((error) => {
      this.result = false;
      console.log(error);
    })

  }


  onScroll() {
    console.log("scroll")
    this.loader = true;
    this.articleService.getNextPageByUser().then(
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

  public onDelete(article: any): void {
    let id = this.articles.indexOf(article)
    if (id != undefined) {
      this.articles.splice(id, 1)

    }
  }

}
