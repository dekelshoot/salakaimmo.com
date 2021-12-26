import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Article } from '../models/article.model';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService   {
  articles: Article[] = [] ;
  articleSearch: Article[] = [] ;
  searchSubject = new Subject<Article[]>();
  articleSubscription!: Subscription;
  searchObject!:any;

  constructor(private articleService: ArticleService) { }

  //emetre les les subjects pour permetre leur utilisation 
  emitSearch(){
    this.searchSubject.next(this.articleSearch);
  }

   search(searchObject:any){
    console.log(searchObject)
     this.articleSearch = [];
      this.searchObject=searchObject;
      this.articles=this.articleService.articles;

     if(this.objectSize(searchObject) == 4){
        for(let [i,article] of this.articles.entries()){
            if(article.categorie == searchObject.type){ 
              if(article.nombreChambre == searchObject.chambre.slice(0,1)){
                if(article.lieu == searchObject.lieu){
                  article.id= i;
                  this.searchPrix(article,searchObject.prix)
                }else{
                  //  break;
                }
              }else{
                //  break;
              }
          }else{
            //  break;
          }
        }


      }else{
      for(let [i,article] of this.articles.entries()){
        if(article.categorie == searchObject.type){
            if(article.lieu == searchObject.lieu){
              article.id = i;
              this.searchPrix(article,searchObject.prix)
            }else{
              //  break;
            }
        }else{
          //  break;
        }
      }

      }

     
   }


//determiner la taille de l'object
  objectSize(object:any) {
    let size = 0, key;
    for (key in object) {
        if (object.hasOwnProperty(key)) size++;
    }
    return size;
  };


  searchPrix(a:any,b:string){
    let prix = b.slice(0,1)
    if(prix == "0"){
      if(0<=a.prix && a.prix<=50000){
        this.articleSearch.push(a);
      }
    }else if(prix == "5"){
      if(50000<=a.prix && a.prix<=150000){
        this.articleSearch.push(a);
      }
    }else if(prix == "1"){
      if(150000<=a.prix && a.prix<=300000){
        this.articleSearch.push(a);
      }
    }else if(prix == "3"){
      if(300000<=a.prix && a.prix<=500000){
        this.articleSearch.push(a);
      }
    }else if(prix == ">"){
      if(a.prix>=500000){
        this.articleSearch.push(a);
      }
    }
    
  }


}

