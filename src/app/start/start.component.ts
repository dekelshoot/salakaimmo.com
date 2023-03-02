import { Component, OnInit } from '@angular/core';
import { ArraysService } from '../services/arrays.service';
import { Article } from '../models/article.model';
import { Router } from '@angular/router';
import { RouterService } from '../services/router.service';
import { Subscription } from 'rxjs';
import { ArticleService } from '../services/article.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  articleRecent: Article[] = [];
  choixEquipe: Article[] = [];
  MaisonALouer: Article[] = [];
  MaisonAVendre: Article[] = [];
  MaisonMeuble: Article[] = [];
  Terrain: Article[] = [];
  Boutique: Article[] = [];
  FondCommerce: Article[] = [];
  Entrepot: Article[] = [];
  AppartementALouer: Article[] = [];
  AppartementMeuble: Article[] = [];
  AppartementAVendre: Article[] = [];
  studioALouer: Article[] = [];
  studioMeuble: Article[] = [];
  chambreALouer: Article[] = [];
  chambreMeuble: Article[] = [];
  Autre: Article[] = [];
  Usine: Article[] = [];
  Magasin: Article[] = [];
  recents: Article[] = [];
  displaySlide = {
    articleRecent: true,
    choixEquipe: true,
    MaisonALouer: true,
    MaisonAVendre: true,
    MaisonMeuble: true,
    Terrain: true,
    Boutique: true,
    FondCommerce: true,
    Entrepot: true,
    AppartementALouer: true,
    AppartementMeuble: true,
    AppartementAVendre: true,
    studioALouer: true,
    studioMeuble: true,
    chambreALouer: true,
    chambreMeuble: true,
    Autre: true,
    Usine: true,
    Magasin: true,
    recents: true,
  }
  scroll = false;
  smallMenu = 'selection';
  fixedTop = false;
  placeholder = ['', '', ''];
  placeholder2 = ['', ''];
  start = false;
  windows: any;
  carouselWeb = {
    cellsToScroll: 2.5,
    cellsToShow: 3.5,
    autoplay: true,
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
    autoplay: true,
    autoplayInterval: 4000,
    pauseOnHover: true,
    height: 280,
    margin: 10,
    arrowsOutside: false,
    arrowsTheme: 'dark',
  };
  articles: Array<any> = [];
  category!: Array<string>;
  cellsToScroll = 2.5;
  color!: string[];
  constructor(
    private arraysService: ArraysService,
    public routerService: RouterService,
    private articleService: ArticleService
  ) { }

  ngOnInit(): void {
    // this.articleService.startAccueil()
    this.routerService.setRoute('/accueil');
    document.getElementById('head')?.scrollIntoView();
    this.windows = window.innerWidth;
    this.category = this.arraysService.category2;
    // this.articles = this.arraysService.articles;
    this.color = this.arraysService.color;
    setTimeout(() => {
      for (let i = 0; i <= 5; i++) {
        this.articles.push(this.arraysService.articles[i]);
      }
    }, 10000)


    this.onInitStart();
    document.getElementById("head")?.scrollIntoView();


  }




  replace(data: string) {
    return data.replace(/ /g, "-");
  }

  money(a: any) {
    const b = new Intl.NumberFormat().format(a)
    return b;
  }


  onInitStart() {
    //plus recents

    if (this.articleService.articleRecent.length == 0) {
      this.articleService.getMoreRecentArticles().then((data: any) => {
        this.articleRecent = data;
        this.articleService.articleRecent = data;
        this.displaySlide.articleRecent = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.articleRecent = this.articleService.articleRecent
    }

    if (this.articleService.AppartementALouer.length == 0) {
      this.articleService.getArticleForHomme("Appartement à louer").then((data: any) => {
        this.AppartementALouer = data;
        this.articleService.AppartementALouer = data;
        this.displaySlide.AppartementALouer = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.AppartementALouer = this.articleService.AppartementALouer
    }

    if (this.articleService.AppartementAVendre.length == 0) {
      this.articleService.getArticleForHomme("Appartement à vendre").then((data: any) => {
        this.AppartementAVendre = data;
        this.articleService.AppartementAVendre = data;
        this.displaySlide.AppartementAVendre = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.AppartementAVendre = this.articleService.AppartementAVendre
    }

    if (this.articleService.AppartementMeuble.length == 0) {
      this.articleService.getArticleForHomme("Appartement meublé").then((data: any) => {
        this.AppartementMeuble = data;
        this.articleService.AppartementMeuble = data;
        this.displaySlide.AppartementMeuble = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.AppartementMeuble = this.articleService.AppartementMeuble
    }

    if (this.articleService.MaisonALouer.length == 0) {
      this.articleService.getArticleForHomme("Maison à louer").then((data: any) => {
        this.MaisonALouer = data;
        this.articleService.MaisonALouer = data;
        this.displaySlide.MaisonALouer = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.MaisonALouer = this.articleService.MaisonALouer
    }

    if (this.articleService.MaisonAVendre.length == 0) {
      this.articleService.getArticleForHomme("Maison à vendre").then((data: any) => {
        this.MaisonAVendre = data;
        this.articleService.MaisonAVendre = data;
        this.displaySlide.MaisonAVendre = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.MaisonAVendre = this.articleService.MaisonAVendre
    }

    if (this.articleService.MaisonMeuble.length == 0) {
      this.articleService.getArticleForHomme("Maison meublé").then((data: any) => {
        this.MaisonMeuble = data;
        this.articleService.MaisonMeuble = data;
        this.displaySlide.MaisonMeuble = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.MaisonMeuble = this.articleService.MaisonMeuble
    }

    if (this.articleService.chambreALouer.length == 0) {
      this.articleService.getArticleForHomme("Chambre à louer").then((data: any) => {
        this.chambreALouer = data;
        this.articleService.chambreALouer = data;
        this.displaySlide.chambreALouer = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.chambreALouer = this.articleService.chambreALouer
    }


    if (this.articleService.chambreMeuble.length == 0) {
      this.articleService.getArticleForHomme("Chambre meublé").then((data: any) => {
        this.chambreMeuble = data;
        this.articleService.chambreMeuble = data;
        this.displaySlide.chambreMeuble = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.chambreMeuble = this.articleService.chambreMeuble
    }



    if (this.articleService.studioALouer.length == 0) {
      this.articleService.getArticleForHomme("Studio à louer").then((data: any) => {
        this.studioALouer = data;
        this.articleService.studioALouer = data;
        this.displaySlide.studioALouer = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.studioALouer = this.articleService.studioALouer
    }

    if (this.articleService.studioMeuble.length == 0) {
      this.articleService.getArticleForHomme("Studio meublé").then((data: any) => {
        this.studioMeuble = data;
        this.articleService.studioMeuble = data;
        this.displaySlide.studioMeuble = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.studioMeuble = this.articleService.studioMeuble
    }

    if (this.articleService.Terrain.length == 0) {
      this.articleService.getArticleForHomme("Terrain").then((data: any) => {
        this.Terrain = data;
        this.articleService.Terrain = data;
        this.displaySlide.Terrain = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.Terrain = this.articleService.Terrain
    }

    if (this.articleService.Boutique.length == 0) {
      this.articleService.getArticleForHomme("Boutique").then((data: any) => {
        this.Boutique = data;
        this.articleService.Boutique = data;
        this.displaySlide.Boutique = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.Boutique = this.articleService.Boutique
    }

    if (this.articleService.FondCommerce.length == 0) {
      this.articleService.getArticleForHomme("Fond de commerce").then((data: any) => {
        this.FondCommerce = data;
        this.articleService.FondCommerce = data;
        this.displaySlide.FondCommerce = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.FondCommerce = this.articleService.FondCommerce
    }


    if (this.articleService.Usine.length == 0) {
      this.articleService.getArticleForHomme("Usine").then((data: any) => {
        this.Usine = data;
        this.articleService.Usine = data;
        this.displaySlide.Usine = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.Usine = this.articleService.Usine
    }

    if (this.articleService.Entrepot.length == 0) {
      this.articleService.getArticleForHomme("Entrepot").then((data: any) => {
        this.Entrepot = data;
        this.articleService.Entrepot = data;
        this.displaySlide.Entrepot = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.Entrepot = this.articleService.Entrepot
    }



    if (this.articleService.Magasin.length == 0) {
      this.articleService.getArticleForHomme("Magasin").then((data: any) => {
        this.Magasin = data;
        this.articleService.Magasin = data;
        this.displaySlide.Magasin = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.Magasin = this.articleService.Magasin
    }


    if (this.articleService.Autre.length == 0) {
      this.articleService.getArticleForHomme("Usine").then((data: any) => {
        this.Autre = data;
        this.articleService.Autre = data;
        this.displaySlide.Autre = data.length == 0 ? false : true;
      }).catch((err) => { console.log(err) });
    } else {
      this.Autre = this.articleService.Autre
    }



  }

  recent() {
    this.recents = []
    for (let i of this.MaisonAVendre) {
      let a: Article = i
      this.recents.push(i)
    }
    for (let i of this.MaisonALouer) {
      let a: Article = i
      this.recents.push(i)
    }
    // for (let i of this.AppartementALouer){
    //   let a:Article=i
    //    this.recents.push(i)
    // }
    for (let i of this.AppartementMeuble) {
      let a: Article = i
      this.recents.push(i)
    }
    for (let i of this.studioALouer) {
      let a: Article = i
      this.recents.push(i)
    }
    for (let i of this.studioMeuble) {
      let a: Article = i
      this.recents.push(i)
    }
    for (let i of this.chambreALouer) {
      let a: Article = i
      this.recents.push(i)
    }
    for (let i of this.chambreMeuble) {
      let a: Article = i
      this.recents.push(i)
    }
    for (let i of this.Terrain) {
      let a: Article = i
      this.recents.push(i)
    }
    for (let i of this.Entrepot) {
      let a: Article = i
      this.recents.push(i)
    }
    for (let i of this.FondCommerce) {
      let a: Article = i
      this.recents.push(i)
    }
    for (let i of this.Boutique) {
      let a: Article = i
      this.recents.push(i)
    }
  }

  //remonter en haut-----------------------------------------------
  rideUp() {
    document.getElementById("head")?.scrollIntoView();
  }
  rideUp2(id: string) {
    document.getElementById(id)?.scrollIntoView();
  }
  getDisplay() {
    if (this.scroll == false) {
      return "none"
    } else {
      return "block"
    }
  }
}
