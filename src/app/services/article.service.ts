
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
  choixEquipe: Article[]=[];
  MaisonALouer: Article[] = [] ;
  MaisonMeuble: Article[] = [] ;
  MaisonAVendre: Article[] = [] ;
  Terrain: Article[] = [] ;
  Boutique: Article[] = [] ;
  FondCommerce: Article[] = [] ;
  Entrepot: Article[] = [] ;
  Usine: Article[] = [] ;
  Magasin: Article[] = [] ;
  AppartementALouer: Article[] = [] ;
  AppartementMeuble: Article[] = [] ;
  AppartementAVendre: Article[] = [] ;
  studioALouer: Article[] = [] ;
  studioMeuble: Article[] = [] ;
  chambreALouer: Article[] = [] ;
  chambreMeuble: Article[] = [] ;
  autre: Article[] = [] ;
  start = true;
  categoryArticle = "Tout"

  articleSubject= new Subject<Article[]>();
  choixEquipeSubject= new Subject<Article[]>();
  MaisonALouerSubject= new Subject<Article[]>();
  MaisonAVendreSubject= new Subject<Article[]>();
  BoutiqueSubject= new Subject<Article[]>();
  FondCommerceSubject= new Subject<Article[]>();
  EntrepotSubject= new Subject<Article[]>();
  TerrainSubject= new Subject<Article[]>();
  AppartementALouerSubject= new Subject<Article[]>();
  AppartementMeubleSubject= new Subject<Article[]>();
  AppartementAVendreSubject= new Subject<Article[]>();
  studioALouerSubject= new Subject<Article[]>();
  studioMeubleSubject= new Subject<Article[]>();
  chambreALouerSubject= new Subject<Article[]>();
  chambreMeubleSubject= new Subject<Article[]>();
  usineSubject= new Subject<Article[]>();
  magasinSubject= new Subject<Article[]>();
  autreSubject= new Subject<Article[]>();
  startSubject= new Subject<boolean>();
  constructor(private router:Router) { }
  categorySubject =  new Subject<string>();



//emetre les les subjects pour permetre leur utilisation 
  emitchoixEquipe(){
    this.choixEquipeSubject.next(this.choixEquipe);
  }
  emitArticle(){
    this.articleSubject.next(this.articles);
  }
  emitMaisonALouer(){
    this.MaisonALouerSubject.next(this.MaisonALouer);
  }
  emitMaisonAVendre(){
    this.MaisonAVendreSubject.next(this.MaisonAVendre);
  }
  emitTerrain(){
    this.TerrainSubject.next(this.Terrain);
  }
  emitBoutique(){
    this.BoutiqueSubject.next(this.Boutique);
  }
  emitFondCommerce(){
    this.FondCommerceSubject.next(this.FondCommerce);
  }
  emitEntrepot(){
    this.EntrepotSubject.next(this.Entrepot);
  }

  emitAppartementALouer(){
    this.AppartementALouerSubject.next(this.AppartementALouer);
  }

  emitAppartementAVendre(){
    this.AppartementAVendreSubject.next(this.AppartementAVendre);
  }

  emitAppartementMeuble(){
    this.AppartementMeubleSubject.next(this.AppartementMeuble);
  }

  emitstudioALouer(){
    this.studioALouerSubject.next(this.studioALouer)
  }
  emitstudioMeuble(){
    this.studioMeubleSubject.next(this.studioMeuble)
  }
  emitchambreALouer(){
    this.chambreALouerSubject.next(this.chambreALouer);
  }
  emitchambreMeuble(){
    this.chambreMeubleSubject.next(this.chambreMeuble);
  }

  emitUsine(){
    this.usineSubject.next(this.Usine);
  }

  emitMagasin(){
    this.magasinSubject.next(this.Magasin);
  }
  

  emitautre(){
    this.autreSubject.next(this.autre);
  }

  emitStart(){
    this.startSubject.next(this.start);
  }

  emitCat(){
    this.categorySubject.next(this.categoryArticle)
  }



     //sauvegarder les articles dans la base de donnée

    IncrementView(cat:string,id:number,article:Article){
      article.nombreVu=article.nombreVu+1
      const db = getDatabase();
      set(ref(db, '/article/'+cat+'/'+id), article);
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
  getArticle(route:string){
    const db = getDatabase();
    const articleRef = ref(db, '/article/'+route);
    return new Promise(
      (resolve, reject)=>{
        onValue(articleRef, (snapshot) => {
          resolve(snapshot.val());
          this.start=false;
          this.emitStart();
          },(error:any)=>{
          reject(error)
          }
        );
      }
    )

  }

  
  startAccueil(){
    this.getArticle("choix équipe").then(
      (data:any)=>{
        this.choixEquipe = data;
        this.emitchoixEquipe()
      }
    )
    this.getArticle("Maison à louer").then(
      (data:any)=>{
        this.MaisonALouer = data;
        this.emitMaisonALouer()
      }
    )
    this.getArticle("Maison à vendre").then(
      (data:any)=>{
        this.MaisonAVendre = data;
        this.emitMaisonAVendre()
      }
    )
    this.getArticle("Terrain").then(
      (data:any)=>{
        this.Terrain = data;
        this.emitTerrain()
      }
    )
    this.getArticle("Boutique").then(
      (data:any)=>{
        this.Boutique = data;
        this.emitBoutique()
      }
    )
    this.getArticle("Fond de commerce").then(
      (data:any)=>{
        this.FondCommerce = data;
        this.emitFondCommerce()
      }
    )
    this.getArticle("Entrepot").then(
      (data:any)=>{
        this.Entrepot = data;
        this.emitEntrepot()
      }
    )
    this.getArticle("Usine").then(
      (data:any)=>{
        this.Usine = data;
        this.emitUsine()
      }
    )
    this.getArticle("Magasin").then(
      (data:any)=>{
        this.Magasin = data;
        this.emitMagasin()
      }
    )
    this.getArticle("Appartement à louer").then(
      (data:any)=>{
        this.AppartementALouer = data;
        this.emitAppartementALouer()
      }
    )
    this.getArticle("Appartement meublé").then(
      (data:any)=>{
        this.AppartementMeuble = data;
        this.emitAppartementMeuble()
      }
    )

    this.getArticle("Studio à louer").then(
      (data:any)=>{
        this.studioALouer = data;
        this.emitstudioALouer()
      }
    )
    this.getArticle("Studio meublé").then(
      (data:any)=>{
        this.studioMeuble = data;
        this.emitstudioMeuble()
      }
    )
    this.getArticle("Chambre à louer").then(
      (data:any)=>{
        this.chambreALouer = data;
        this.emitchambreALouer()
      }
    )
    this.getArticle("Chambre Meublé").then(
      (data:any)=>{
        this.chambreMeuble = data;
        this.emitchambreMeuble()
      }
    )
    this.getArticle("Autre").then(
      (data:any)=>{
        this.autre = data;
        this.emitautre()
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
    const db = getDatabase();
    return new Promise(
    (resolve,reject)=>{
      if(newArticle.categorie == "Maison à vendre"){
        this.MaisonAVendre.unshift(newArticle);
        set(ref(db, 'article/Maison à vendre'), this.MaisonAVendre).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitMaisonAVendre();
      }else if(newArticle.categorie == "Maison à louer"){
        this.MaisonALouer.unshift(newArticle);
        set(ref(db, 'article/Maison à louer'), this.MaisonALouer).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitMaisonALouer();
      }else if(newArticle.categorie == "Maison meublé"){
        this.MaisonMeuble.unshift(newArticle);
        set(ref(db, 'article/Maison meublé'), this.MaisonMeuble).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitchambreMeuble();
      }else if(newArticle.categorie == "Appartement à louer"){
        this.AppartementALouer.unshift(newArticle);
        console.log(this.AppartementALouer)
        set(ref(db, 'article/Appartement à louer'), this.AppartementALouer).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitAppartementALouer();
      }else if(newArticle.categorie == "Appartement à vendre"){
        this.AppartementAVendre.unshift(newArticle);
        set(ref(db, 'article/Appartement à vendre'), this.AppartementAVendre).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitAppartementAVendre();
      }else if(newArticle.categorie == "Appartement meublé"){
        this.AppartementMeuble.unshift(newArticle);
        set(ref(db, 'article/Appartement meublé'), this.AppartementMeuble).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitAppartementMeuble();
      }else if(newArticle.categorie == "Studio à louer"){
        this.studioALouer.unshift(newArticle);
        set(ref(db, 'article/Studio à louer'), this.studioALouer).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitstudioALouer();
      }else if(newArticle.categorie == "Studio meublé"){
        this.studioMeuble.unshift(newArticle);
        set(ref(db, 'article/Studio meublé'), this.studioMeuble).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitstudioMeuble();
      }else if(newArticle.categorie == "Chambre à louer"){
        this.chambreALouer.unshift(newArticle);
        set(ref(db, 'article/Chambre à louer'), this.chambreALouer).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitchambreALouer();
      }else if(newArticle.categorie == "Chambre meublé"){
        this.chambreMeuble.unshift(newArticle);
        set(ref(db, 'article/Chambre meublé'), this.chambreMeuble).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitchambreMeuble();
      }else if(newArticle.categorie == "Boutique"){
        this.Boutique.unshift(newArticle);
        set(ref(db, 'article/Boutique'), this.Boutique).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitBoutique();
      }else if(newArticle.categorie == "Usine"){
        this.Usine.unshift(newArticle);
        set(ref(db, 'article/Usine'), this.Usine).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitUsine();
      }else if(newArticle.categorie == "Terrain"){
        this.Terrain.unshift(newArticle);
        set(ref(db, 'article/Terrain'), this.Terrain).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitTerrain();
      }else if(newArticle.categorie == "Entrepot"){
        this.Entrepot.unshift(newArticle);
        set(ref(db, 'article/Entrepot'), this.Entrepot).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitEntrepot();
      }else if(newArticle.categorie == "Fond de commerce"){
        this.FondCommerce.unshift(newArticle);
        set(ref(db, 'article/Fond de commerce'), this.FondCommerce).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitFondCommerce();
      }else if(newArticle.categorie == "Magasin"){
        this.Magasin.unshift(newArticle);
        set(ref(db, 'article/Magasin'), this.Magasin).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitMagasin();
      }else if(newArticle.categorie == "Autre"){
        this.autre.unshift(newArticle);
        set(ref(db, 'article/Autre'), this.autre).then(
          (value:any)=>{
            resolve(value)
          }
        );
        this.emitautre();
      }
    }
    
    )
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
    this.emitArticle();
  }



  
}


