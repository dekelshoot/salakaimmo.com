import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getAuth } from "firebase/auth";
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  articles: Article[]=[];
  allArticles! : Article[];
  articleSubscription! : Subscription;
  startSubject!: Subscription;
  urlss="../../assets/photo.jpg";
  start = false;
  dealers:any;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private articleService:ArticleService) { }


  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.articleSubscription = this.articleService.articleSubject.subscribe(
      ( article: Article[]) =>{
        this.allArticles = article;
        this.articles=[]
        this.getArticleDealer()
      }
    );

    this.startSubject = this.articleService.startSubject.subscribe(
      (start:boolean) =>{
        this.start = start
      }
    );
    this.articleService.getArticle();
    this.articleService.emitArticle();
    this.articleService.emitStart();
  }

  onViewProperty(id:number){
    this.articleService.start = true;
    this.articleService.emitStart();
    setTimeout(
      ()=>{
        this.articleService.start = false;
        this.articleService.emitStart();
        this.router.navigate( ['/article','view', id]);
      },1000
    )
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  getArticleDealer(){
    const auth = getAuth();
    for (let [i,article] of this.allArticles.entries()){
      if(article.dealerEmail == auth.currentUser?.email){
        article.id = i;
        this.articles.push(article)
      }
    }
  }


  scroll(id:string){
    document.getElementById(id)?.scrollIntoView();
  }
  
  onBack(){
    this.router.navigate( ['/accueil']);
  
  }
}

