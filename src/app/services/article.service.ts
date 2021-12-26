
import { Injectable } from '@angular/core';


import { getDatabase, ref, set, onValue ,} from "firebase/database";



import { Subject } from 'rxjs';
import { Article} from 'src/app/models/article.model';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articles: Article[] = [] ;
  start = false;
  categoryArticle = "Tout"

  articleSubject= new Subject<Article[]>();
  startSubject= new Subject<boolean>();
  constructor(private router:Router) { }
  categorySubject =  new Subject<string>();



//emetre les les subjects pour permetre leur utilisation 
  emitArticle(){
    this.articleSubject.next(this.articles);
  }

  emitStart(){
    this.startSubject.next(this.start);
  }

  emitCat(){
    this.categorySubject.next(this.categoryArticle)
  }

  //sauvegarder les articles dans la base de donnée
  saveArticles(){
    const db = getDatabase();
    set(ref(db, 'articles/'), this.articles);
  }

  initStart(){
    this.start=true
    setTimeout(
      ()=>{
        this.start = false;
        this.emitStart()
      },2000
    )
  }

  //recuperer les articles de la base de donnéee
  getArticle(){
    const db = getDatabase();
    const articleRef = ref(db, '/articles');
    return new Promise(
      (resolve, reject)=>{
        onValue(articleRef, (snapshot) => {
          resolve(snapshot.val());
          const data = snapshot.val();
          this.articles = data;
          this.emitArticle();
          },(error:any)=>{
          reject(error)
          }
        );
      }
    )

  }


  //liste des articles par category
  switchCat(cat:string){
    this.categoryArticle = cat;
    this.emitCat()
  }


  //recuperer une article de la base de données
  getSingleArticle(id:number){
    const db = getDatabase()
      return new Promise(
        (resolve,reject)=>{
          onValue(ref(db, '/articles/' + id), (snapshot) => {
                  resolve(snapshot.val());                
                }, (error:any)=>{
                  reject(error)
                }
          );
        }
      )

  }


  //cree un article
  createNewArticle(newArticle: Article){
    this.articles.unshift(newArticle);
    this.saveArticles();
    this.emitArticle();
  }


  activeStart(){
    this.start=true;
    this.emitStart();
    setTimeout(
      ()=>{
        this.start=false;
        this.emitStart();
      },1000
    )

  }

  //suprimer une propriete de la base de données
  removearticle(article:Article){
    const articleIndexToRemove = this.articles.findIndex(
      (articleEl) => {
        if(articleEl === article){
          return true;
        }
        else return false;
      }
    );

    this.articles.splice(articleIndexToRemove,1);
    this.saveArticles();
    this.emitArticle();
  }



  
}


