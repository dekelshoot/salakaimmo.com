import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from 'src/app/services/article.service';
import { Subscription } from 'rxjs';
import { Article } from '../../models/article.model';

@Component({
  selector: 'app-article-by-cat',
  templateUrl: './article-by-cat.component.html',
  styleUrls: ['./article-by-cat.component.scss']
})
export class ArticleByCatComponent implements OnInit {
  articleByDate! :Article[];
  articles!: Article[];
  articleFiltrer: Article[] = [];
  articleSubscribe! : Subscription;
  startSuscribe!: Subscription;
  categorieSuscribe!: Subscription;
  start = false;
  loading=false;
  categorie = "";
  filter = "date";
 

  constructor(private articleService: ArticleService,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.articleSubscribe = this.articleService.articleSubject.subscribe(
      (article: Article[]) =>{
        this.articles = article;
        this.articleByDate=article;
        }
      );

    
    this.startSuscribe = this.articleService.startSubject.subscribe(
      (start:boolean) =>{
        this.start = start;
        }
      );

    this.categorieSuscribe = this.articleService.categorySubject.subscribe(
      (categorie:string) =>{
        this.categorie = categorie;
        this.onChangeCat(this.categorie);
      }
    );

    this.articleService.getArticle();
    this.articleService.emitArticle();
    this.articleService.emitStart();
    this.articleService.emitCat();

    window.addEventListener('scroll',()=>{
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
      if(clientHeight+scrollTop>=scrollHeight-600){
        this.loading=true;
        setTimeout(() => {
          this.loading=false
        },1000);
      }
    })

    
  }

  onSwitchCat(cat:string){
    this.articleService.switchCat(cat)
    this.articleService.emitCat()
    this.articleService.start = true;
    this.articleService.emitStart()
    setTimeout(
      ()=>{
        this.articleService.start = false;
        this.articleService.emitStart()
        this.router.navigate(['/article','category',cat])
      },1000
    ); 
  }



  onChangeCat(cat:string){
    document.getElementById("head")?.scrollIntoView();
    if(cat == "Tout"){
      this.articleFiltrer=[];
      for (let [i,article] of this.articles.entries() ){
          article.id = i;
          this.articleFiltrer.push(article)
      }
    }else{
        this.articleFiltrer=[];
        for (let [i,article] of this.articles.entries() ){
          if(article.categorie.indexOf(cat)!=-1){
            article.id = i;
            this.articleFiltrer.push(article)
          }
        }
    }
    }

    onFilter(filter:string){
      document.getElementById("head")?.scrollIntoView();
      this.articleService.start = true;
    this.articleService.emitStart()
    setTimeout(
      ()=>{
        this.articleService.start = false;
        this.articleService.emitStart()
      },1000
    ); 
      this.filter = filter;
      if(filter == "date"){
        this.articleFiltrer=this.trieDate(this.articleFiltrer)
        }
      else if(filter == "prixCroissant"){
        this.articleFiltrer=this.trieDown(this.articleFiltrer)
        }
      else if(filter == "prixDecroissant"){
        this.articleFiltrer=this.trieTop(this.articleFiltrer)  
      }
      else if(filter == "filter"){  
      }

    }
      
  
  
  
  onViewProperty(id:number){
    this.vue(id)
    this.router.navigate( ['/article','view', id]);
  }
  
  ngOnDestroy(): void {
  this.articleSubscribe.unsubscribe();
  }

  onBack(){
    this.router.navigate( ['/accueil']);
  }


trieDown(articles:Article[]){
  const len = articles.length
  for (let i = 0; i < len; i++) {
    let min = i
    for (let j = i + 1; j < len; j++) {
      if (articles[min].prix > articles[j].prix) {
        min = j
      }
    }
    if (min !== i) {
      [articles[i], articles[min]] = [articles[min], articles[i]]
    }
  }
  return articles
}

trieTop(articles:Article[]){
  const len = articles.length
  for (let i = 0; i < len; i++) {
    let max = i
    for (let j = i + 1; j < len; j++) {
      if (articles[max].prix < articles[j].prix) {
        max = j
      }
    }
    if (max !== i) {
      [articles[i], articles[max]] = [articles[max], articles[i]]
    }
  }
  return articles
}

trieDate(articles:Article[]){
  const len = articles.length
  for (let i = 0; i < len; i++) {
    let min = i
    for (let j = i + 1; j < len; j++) {
      if (new Date(articles[min].datePublication) < new Date(articles[j].datePublication)) {
        min = j
      }
    }
    if (min !== i) {
      [articles[i], articles[min]] = [articles[min], articles[i]]
    }
  }
  return articles
}

vue(i:number){
  this.articles[i].nombreVu=this.articles[i].nombreVu+1
  this.articleService.articles=this.articles
  this.articleService.saveArticles();
  this.articleService.emitArticle()
}
 
}


