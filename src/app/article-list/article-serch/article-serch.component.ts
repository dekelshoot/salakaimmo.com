import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article.model';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArraysListService } from 'src/app/services/arrays-list.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-article-serch',
  templateUrl: './article-serch.component.html',
  styleUrls: ['./article-serch.component.scss']
})
export class ArticleSerchComponent implements OnInit {
  searchForm!: FormGroup;
  articles! : Article[];
  articleSubscription! : Subscription;
  startSubject!: Subscription;
  typeBien!:string[];
  typeTransaction!:string[];
  chambre!:string[];
  prix!:string[];
  lieu!:string[];
  viewChambre = false;
  urlss="../../assets/photo.jpg";
  start = false;
  articleSearch: Article[] = [] ;
  searchSubscribe! : Subscription;
  startSuscribe!: Subscription;
  constructor(private articleService: ArticleService,
              private arraysListService:ArraysListService, 
              private searchService:SearchService,
              private router: Router,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.articleService.getArticle();
  this.articleSearch = this.searchService.articleSearch;

  this.typeBien = this.arraysListService.category;
  this.typeTransaction = this.arraysListService.typeExchange;
  this.chambre = this.arraysListService.chambre;
  this.prix = this.arraysListService.prix;
  this.lieu = this.arraysListService.location;


  this.startSubject = this.articleService.startSubject.subscribe(
    (start:boolean) =>{
      this.start = start

    }
  );
  this.initForm();
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
  this.articleSearch = this.searchService.articleSearch;
}


refresh(){
  this.articleSearch = this.searchService.articleSearch;
}


onViewProperty(id:number){
  this.vue(id)
  this.articleService.start = true;
  this.articleService.emitStart();
  setTimeout(
    ()=>{
      this.articleService.start = true;
      this.articleService.emitStart();
      this.router.navigate( ['/article','view', id]);
    },1000
  )
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


onBack(){
  this.router.navigate( ['/accueil'])
}

vue(i:number){
  this.articleService.articles[i].nombreVu++
  this.articleService.saveArticles();
  this.articleService.emitArticle()
}

}
