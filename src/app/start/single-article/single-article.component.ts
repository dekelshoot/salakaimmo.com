import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { Dealer } from 'src/app/models/dealer.model';
import { ArraysService } from 'src/app/services/arrays.service';
import { ArticleService } from 'src/app/services/article.service';
import { DealerService } from 'src/app/services/dealer.service';
import { RouterService } from 'src/app/services/router.service';
import { MetadataService } from '../../services/metadata.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss'],
})
export class SingleArticleComponent implements OnInit {
  sameArticle: Article[] = [];
  errorSimilaire = false;
  article!: Article;
  link = new Array();
  hrefWa!: string;
  hrefSms!: string;
  hrefMail!: string;
  hrefTel!: string;
  dealer!: Dealer;
  categorie!: string;
  start = false
  carouselWeb = {
    cellsToScroll: 1,
    cellsToShow: 1,
    autoplay: false,
    autoplayInterval: 8000,
    pauseOnHover: true,
    height: 370,
    margin: 10,
    arrowsOutside: false,
    arrowsTheme: 'dark',
  };
  error = {
    title: " Oups... Pas d'annonces correspondante!!!",
    errorMessage: " Désolé, nous n'avons pas encore d'annonce correspondante à cette recherche.",
    instruction: "Veuillez réessayer avec d'autres paramètres.",
    rout: "/article/recherche"
  }
  constructor(
    private routes: ActivatedRoute,
    private metadataService: MetadataService,
    public routerService: RouterService,
    private articleService: ArticleService,
    private dealerService: DealerService,
  ) { }

  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.routerService.setRoute('');
    let id = this.routes.snapshot.params['id']
    this.categorie = id.split
    this.articleService.getSingleArticle(id).then(
      (data: any) => {
        this.article = data;
        this.start = true;
        document.getElementById("head")?.scrollIntoView();
        this.dealerService.getSingleDealer(this.article.dealerId).then(
          (data: any) => {
            this.dealer = data;
            this.getDealerInfo(this.dealer);
            this.updateMetadata(this.article)
          }
        )
        this.articleService.getArticleSimilaire(this.article).then(
          (data: any) => {
            this.sameArticle = data;
            if (data.length > 0) {
              this.errorSimilaire = false;
            } else {
              this.errorSimilaire = true;
            }
            console.log(data)
          }

        ).catch((error) => {
          this.errorSimilaire = true;
          console.log(error);
        })
      }

    ).catch((error) => {
      console.log(error);
    })
    document.getElementById("head")?.scrollIntoView();
  }

  getSimilaire(article: any) {

  }

  toDate(date: any) {
    return date.toDate()
  }

  money(a: any) {
    const b = new Intl.NumberFormat().format(a);
    return b;
  }


  scroolToSection(id: string) {
    document.getElementById(id)?.scrollIntoView();
  }
  same(searchObject: any) {

  }
  getDealerInfo(dealer: any) {
    //gerer les lien de contact avec le client
    this.hrefWa = "http://wa.me/" + dealer?.phoneNumber + "?text=j'ai%20vu%20votre%20annonce%20sur%20salakaimmo%20" + window.location + "%20S'il%20vous%20plait%20,%20envoyez%20moi%20plus%20d'%20information%20à%20ce%20sujet%20";
    this.hrefTel = "tel:" + dealer?.phoneNumber;
    this.hrefSms = "sms:/" + "+" + dealer?.phoneNumber + "/?body=j'ai vu votre annonce sur salakaimmo " + window.location + " S'il vous plait , envoyez moi plus d' information à ce sujet";
    this.hrefMail = "mailto:" + dealer?.email + "?subject=Recherche de logement&body=j'ai vu votre annonce sur salakaimmo " + window.location + " S'il vous plait , envoyez moi plus d' information à ce sujet "

  }
  reaload() {
    this.ngOnInit();
  }

  async onShare() {
    const title = this.article.titre;
    const url = 'http://www.salakaimmo.com/article/view/' + this.article.id
    try {
      await navigator.share({ title: title, url: url })
    } catch (error) {
      alert("Le partage n'est pas pris en charge par votre navigateur ")
    }
  }


  replace(data: string) {
    return data.replace(/ /g, "-");
  }


  updateMetadata(article: Article) {
    this.metadataService.defaultMetadata.description = article.description;
    this.metadataService.defaultMetadata.image = article.photo[1];
    this.metadataService.defaultMetadata.title = article.titre;
    this.metadataService.updateMetadata({}, false);
  }
}
