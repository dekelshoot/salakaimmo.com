import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Dealer } from '../models/dealer.model';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';
import { start } from 'repl';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
dealer!:Dealer;
articles: Article[]=[];
choixEquipe: Article[]=[];
MaisonALouer: Article[]=[];
MaisonAVendre: Article[]=[];
Terrain: Article[] = [] ;
Boutique: Article[] = [] ;
FondCommerce: Article[] = [] ;
Entrepot: Article[] = [] ;
AppartementALouer: Article[] = [] ;
AppartementMeuble: Article[] = [] ;
studioALouer: Article[] = [] ;
studioMeuble: Article[] = [] ;
chambreALouer: Article[] = [] ;
chambreMeuble: Article[] = [] ;
autre: Article[] = [] ;
recents: Article[] = [] ;
choixEquipeSubscription! : Subscription;
MaisonALouerSubscription! : Subscription;
MaisonAVendreSubscription! : Subscription;
TerrainSubscription! : Subscription;
BoutiqueSubscription! : Subscription;
FondCommerceSubscription! : Subscription;
EntrepotSubscription! : Subscription;
AppartementALouerSubscription! : Subscription;
AppartementMeubleSubscription! : Subscription;
studioALouerSubscription! : Subscription;
studioMeubleSubscription! : Subscription;
chambreALouerSubscription! : Subscription;
chambreMeubleSubscription! : Subscription;
autreSubscription! : Subscription;
scroll=false
start=true;
dealerSubscription! : Subscription;
  constructor(private router: Router,
              private authService:AuthService,
              private articleService:ArticleService) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.dealerSubscription = this.authService.dealerSubject.subscribe(
      ( dealer: Dealer) =>{
        this.dealer = dealer;
        this.chargeArticle(this.dealer.email);
      }
    );

    this.authService.getSession();
    this.articleService.startAccueil()
  }

  route(route:string){
    this.router.navigate([route]);
  }

  chargeArticle(dealerEmail:string){
    this.articles=[];
    this.choixEquipeSubscription = this.articleService.choixEquipeSubject.subscribe(
      ( choixEquipe: Article[]) =>{
        if(choixEquipe){
          for(let [id,article] of choixEquipe.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
      }
    );
    this.MaisonALouerSubscription = this.articleService.MaisonALouerSubject.subscribe(
      ( MaisonALouer: Article[]) =>{
        if(MaisonALouer){
          for(let [id,article] of MaisonALouer.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
              console.log(article)
              this.start=false;
            }
          }
        }
      }
    );

    this.MaisonAVendreSubscription = this.articleService.MaisonAVendreSubject.subscribe(
      ( MaisonAVendre: Article[]) =>{
        if(MaisonAVendre){
          for(let [id,article] of MaisonAVendre.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
     }
    );
    this.BoutiqueSubscription = this.articleService.BoutiqueSubject.subscribe(
      ( Boutique: Article[]) =>{
        if(Boutique){
          for(let [id,article] of Boutique.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
      }
    );
    this.TerrainSubscription = this.articleService.TerrainSubject.subscribe(
      ( Terrain: Article[]) =>{
        if(Terrain){
          for(let [id,article] of Terrain.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
      }
    );
    this.FondCommerceSubscription = this.articleService.FondCommerceSubject.subscribe(
      ( FondCommerce: Article[]) =>{
       if(FondCommerce){
        for(let [id,article] of FondCommerce.entries()){
          if(article.dealerEmail==dealerEmail){
            this.articles.push(article)
          }
        }
       }
      }
    );
    this.AppartementALouerSubscription = this.articleService.AppartementALouerSubject.subscribe(
      ( AppartementALouer: Article[]) =>{
        if(AppartementALouer){
          for(let [id,article] of AppartementALouer.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
      }
    );
    this.AppartementMeubleSubscription = this.articleService.AppartementMeubleSubject.subscribe(
      ( AppartementMeuble: Article[]) =>{
        if(AppartementMeuble){
          for(let [id,article] of AppartementMeuble.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
      }
    );
    this.studioALouerSubscription = this.articleService.studioALouerSubject.subscribe(
      ( studioALouer: Article[]) =>{
        if(studioALouer){
          for(let [id,article] of studioALouer.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
      }
    );
    this.studioMeubleSubscription = this.articleService.studioMeubleSubject.subscribe(
      ( studioMeuble: Article[]) =>{
        if(studioMeuble){
          for(let [id,article] of studioMeuble.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
      }
    );
    this.chambreALouerSubscription = this.articleService.chambreALouerSubject.subscribe(
      ( chambreALouer: Article[]) =>{
        if(chambreALouer){
          for(let [id,article] of chambreALouer.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
      }
    );
    this.chambreMeubleSubscription = this.articleService.chambreMeubleSubject.subscribe(
      ( chambreMeuble: Article[]) =>{
        if(chambreMeuble){
          for(let [id,article] of chambreMeuble.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
      }
    );
    this.autreSubscription = this.articleService.autreSubject.subscribe(
      ( autre: Article[]) =>{
        if(autre){
          for(let [id,article] of autre.entries()){
            if(article.dealerEmail==dealerEmail){
              this.articles.push(article)
            }
          }
        }
        }
    );
  }


  replace(data:string){
    return data.replace(/ /g,"-");
  }

  money(a:any){
    const b= new Intl.NumberFormat().format(a)
    return b;
  }


}


