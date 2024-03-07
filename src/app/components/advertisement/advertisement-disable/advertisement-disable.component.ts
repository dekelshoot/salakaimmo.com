import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-advertisement-disable',
  templateUrl: './advertisement-disable.component.html',
  styleUrls: ['./advertisement-disable.component.scss']
})
export class AdvertisementDisableComponent {
  articles: Array<any> = [];
  result = true;
  loader = false;


  error = {
    title: " Oups... Pas d'annonces !!!",
    errorMessage: " Vous n'avez pas encore désactivé une annonce.",
    instruction: "Veuillez désactiver une annonce.",
    rout: "/ads"
  }
  constructor(
    private articleService: ArticleService,
    public routerService: RouterService

  ) { }


  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.routerService.setRoute("/ads");
    this.articleService.getArticleDisableByUser().then(
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
    this.articleService.getNextPageDisableByUser().then(
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
      this.result = false;
      this.loader = false;
    }
  }

}
