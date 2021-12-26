import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article.model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from '../services/search.service';
import { ArraysListService } from '../services/arrays-list.service';
import { VisitorService } from '../services/visitor.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {
  searchForm!: FormGroup;
  articles: Article[]=[];
  chargeArticles:Article[]=[]
  articleSubscription! : Subscription;
  startSubject!: Subscription;
  visitorsSubject!: Subscription;
  typeBien!:string[];
  typeTransaction!:string[];
  chambre!:string[];
  prix!:string[];
  lieu!:string[];
  viewChambre = false;
  connect=false;
  visitors!:number;
  urlss="../../assets/photo.jpg";
  start = false;
  constructor(private articleService: ArticleService,
              private arraysListService:ArraysListService, 
              private searchService:SearchService,
              private visitorService:VisitorService,
              private router: Router,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    document.getElementById("cont")?.scrollIntoView();
    this.typeBien = this.arraysListService.category;
    this.typeTransaction = this.arraysListService.typeExchange;
    this.chambre = this.arraysListService.chambre;
    this.prix = this.arraysListService.prix;
    this.lieu = this.arraysListService.location;
    this.articleSubscription = this.articleService.articleSubject.subscribe(
      ( article: Article[]) =>{
        this.articles = article;
        this.chargeArticles=[];
        this.charge20articles();
        if(this.articles.length!=0){
          this.connect=true;
        }else{
          this.connect=false;
        }
      }
    );

    this.startSubject = this.articleService.startSubject.subscribe(
      (start:boolean) =>{
        this.start = start

      }
    );

    this.startSubject = this.visitorService.visitorSubject.subscribe(
      (visitors:number) =>{
        this.visitors = visitors

      }
    );

    this.initForm();
    this.articleService.getArticle();
    this.articleService.emitArticle();
    this.visitorService.getVisitors();
    this.visitorService.emitVisitor();
    this.articleService.emitStart();

  }

  //initialid=ser le formulaire
  initForm(){
    this.searchForm = this.formBuilder.group({ 
      // transaction:['', Validators.required],
      type:['', Validators.required],
      chambre:['',],
      prix:['', Validators.required],
      lieu:['', Validators.required],
    })
  }

  onSearchArticle(){
    // const transaction = this.searchForm.get('transaction')?.value;
    const type = this.searchForm.get('type')?.value;
    const chambre = this.searchForm.get('chambre')?.value;
    const prix = this.searchForm.get('prix')?.value;
    const lieu = this.searchForm.get('lieu')?.value;

    let searchObject:any;
    if(type=="Boutique" || type=="Fond de commerce" || type=="Terrain" || type=="Studio à louer" || type=="Studio meublé"){
      searchObject={
        // transaction: transaction,
        type: type,
        prix: prix,
        lieu:lieu
      }
    }else{
      searchObject={
        // transaction: transaction,
        type: type,
        chambre: chambre,
        prix: prix,
        lieu: lieu
      }
    }
     
   
    this.searchService.search(searchObject);
    this.articleService.activeStart();
    this.router.navigate(['/article', 'search'])
  }


  onViewProperty(id:number){
    this.vue(id);
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

  Chambre(){
    if(this.searchForm.value.type=="Terrain"){
      this.viewChambre= true;
    }else{
      if(this.searchForm.value.type=="Studio à louer"){
        this.viewChambre= true;
      }else{
        if(this.searchForm.value.type=="Fond de commerce"){
          this.viewChambre= true;
        }else{
          if(this.searchForm.value.type=="Boutique"){
          this.viewChambre= true;
        }else{
          if(this.searchForm.value.type=="Studio meublé"){
            this.viewChambre= true;
          }else{
            this.viewChambre= false;
          }
        }
      }
    }
  }
}

charge20articles(){
  for(let i=0;i<21;i++){
    if(this.articles[i]==undefined){

    }else{
      this.chargeArticles.push(this.articles[i]);
    }
    
  }
}

vue(i:number){
  this.articles[i].nombreVu=this.articles[i].nombreVu+1
  this.articleService.articles=this.articles
  this.articleService.saveArticles();
  this.articleService.emitArticle()
}



}
