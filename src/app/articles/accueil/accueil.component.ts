import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { v4 as uuidv4 } from 'uuid';

// import * as $ from "jquery"
import { ArticleService } from '../../services/article.service';
import { ArrayService } from 'src/app/services/array.service';
import { Article } from 'src/app/models/article.model';
import { Subscription } from 'rxjs';

declare var $:any;

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
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
  smallMenu="selection"
  fixedTop=false;
  start=false;
  constructor( private router: Router,
              private categoryService:CategoryService,
              private articleService:ArticleService) { }

  ngOnInit(): void {
    this.choixEquipeSubscription = this.articleService.choixEquipeSubject.subscribe(
      ( choixEquipe: Article[]) =>{
        if(choixEquipe.length>=8){
          this.choixEquipe=[]
           for(let i=0;i<=7;i++){
              this.choixEquipe.push(choixEquipe[i])
           }
        }else{
          this.choixEquipe=choixEquipe
        }
      }
    );
    this.MaisonALouerSubscription = this.articleService.MaisonALouerSubject.subscribe(
      ( MaisonALouer: Article[]) =>{
        if(MaisonALouer.length>=8){
          this.MaisonALouer=[]
           for(let i=0;i<=7;i++){
              this.MaisonALouer.push(MaisonALouer[i])
           }
        }else{
          this.MaisonALouer=MaisonALouer
        }
        this.start=true;
      }
    );

    this.MaisonAVendreSubscription = this.articleService.MaisonAVendreSubject.subscribe(
      ( MaisonAVendre: Article[]) =>{
        this.MaisonAVendre=[]
        if(MaisonAVendre.length>=8){
          for(let i=0;i<=7;i++){
             this.MaisonAVendre.push(MaisonAVendre[i])
          }
       }else{
         this.MaisonAVendre=MaisonAVendre
       }
     }
    );
    this.BoutiqueSubscription = this.articleService.BoutiqueSubject.subscribe(
      ( Boutique: Article[]) =>{
        this.Boutique=[]
        if(Boutique.length>=8){
          for(let i=0;i<=7;i++){
             this.Boutique.push(Boutique[i])
          }
       }else{
         this.Boutique=Boutique
       }
      }
    );
    this.TerrainSubscription = this.articleService.TerrainSubject.subscribe(
      ( Terrain: Article[]) =>{
        this.Terrain=[]
        if(Terrain.length>=8){
          for(let i=0;i<=7;i++){
             this.Terrain.push(Terrain[i])
          }
       }else{
         this.Terrain=Terrain
       }
      }
    );
    this.FondCommerceSubscription = this.articleService.FondCommerceSubject.subscribe(
      ( FondCommerce: Article[]) =>{
        this.FondCommerce=[]
        if(FondCommerce.length>=8){
          for(let i=0;i<=7;i++){
             this.FondCommerce.push(FondCommerce[i])
          }
       }else{
         this.FondCommerce=FondCommerce
       }
      }
    );
    this.AppartementALouerSubscription = this.articleService.AppartementALouerSubject.subscribe(
      ( AppartementALouer: Article[]) =>{
        this.AppartementALouer=[]
        if(AppartementALouer.length>=8){
          for(let i=0;i<=7;i++){
             this.AppartementALouer.push(AppartementALouer[i])
          }
       }else{
         this.AppartementALouer=AppartementALouer
       }
      }
    );
    this.AppartementMeubleSubscription = this.articleService.AppartementMeubleSubject.subscribe(
      ( AppartementMeuble: Article[]) =>{
        this.AppartementMeuble=[]
        if(AppartementMeuble.length>=8){
          for(let i=0;i<=7;i++){
             this.AppartementMeuble.push(AppartementMeuble[i])
          }
       }else{
         this.AppartementMeuble=AppartementMeuble
       }
      }
    );
    this.studioALouerSubscription = this.articleService.studioALouerSubject.subscribe(
      ( studioALouer: Article[]) =>{
        this.studioALouer=[]
        if(studioALouer.length>=8){
          for(let i=0;i<=7;i++){
             this.studioALouer.push(studioALouer[i])
          }
       }else{
         this.studioALouer=studioALouer
       }
      }
    );
    this.studioMeubleSubscription = this.articleService.studioMeubleSubject.subscribe(
      ( studioMeuble: Article[]) =>{
        this.studioMeuble=[]
        if(studioMeuble.length>=8){
          for(let i=0;i<=7;i++){
             this.studioMeuble.push(studioMeuble[i])
          }
       }else{
         this.studioMeuble=studioMeuble
       }
      }
    );
    this.chambreALouerSubscription = this.articleService.chambreALouerSubject.subscribe(
      ( chambreALouer: Article[]) =>{
        this.chambreALouer=[]
        if(chambreALouer.length>=8){
          for(let i=0;i<=7;i++){
             this.chambreALouer.push(chambreALouer[i])
          }
       }else{
         this.chambreALouer=chambreALouer
       }
      }
    );
    this.chambreMeubleSubscription = this.articleService.chambreMeubleSubject.subscribe(
      ( chambreMeuble: Article[]) =>{
        this.chambreMeuble=[]
        if(chambreMeuble.length>=8){
          for(let i=0;i<=7;i++){
             this.chambreMeuble.push(chambreMeuble[i])
          }
       }else{
         this.chambreMeuble=chambreMeuble
       }
      }
    );
    this.autreSubscription = this.articleService.autreSubject.subscribe(
      ( autre: Article[]) =>{
        this.autre=[]
        if(autre.length>=8){
          for(let i=0;i<=7;i++){
             this.autre.push(autre[i])
          }
       }else{
         this.autre=autre
       }
      }
    );
    
    

    document.getElementById("head")?.scrollIntoView();
    window.addEventListener('scroll',()=>{
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
      if(scrollTop>400){
        this.scroll=true;
        setTimeout(() => {
          this.scroll=false
        },4000);
      }
      if(scrollTop>215){
        this.fixedTop=true;
      }else{
        this.fixedTop=false;
      }
    })

    this.articleService.startAccueil()
  }

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 4,
    "autoplay":true,
    "autoplaySpeed":4000,
    "dots":true,
    "infinite": true,
  };

  slideConfig0= {
    "slidesToShow": 2,
    "slidesToScroll": 2,
    "autoplay":true,
    "autoplaySpeed":4000,
    "dots":true,
    "infinite": true,
  };
  slideConfig2 = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay":true,
    "autoplaySpeed":5000,
    "dots":true,
    "infinite": true,
  };


  route(route:string){
      this.router.navigate([route]);
    }

    routeWithCat(cat:string){
      this.categoryService.changeCat(cat);
      this.router.navigate(['article/category/'+cat.replace(/ /g,"_")]);
    }
    replace(data:string){
      return data.replace(/ /g,"-");
    }

    money(a:any){
      const b= new Intl.NumberFormat().format(a)
      return b;
    }

    recent(){
      this.recents=[]
      for (let i of this.MaisonAVendre){
        let a:Article=i
         this.recents.push(i)
      }
      for (let i of this.MaisonALouer){
        let a:Article=i
         this.recents.push(i)
      }
      // for (let i of this.AppartementALouer){
      //   let a:Article=i
      //    this.recents.push(i)
      // }
      for (let i of this.AppartementMeuble){
        let a:Article=i
         this.recents.push(i)
      }
      for (let i of this.studioALouer){
        let a:Article=i
         this.recents.push(i)
      }
      for (let i of this.studioMeuble){
        let a:Article=i
         this.recents.push(i)
      }
      for (let i of this.chambreALouer){
        let a:Article=i
         this.recents.push(i)
      }
      for (let i of this.chambreMeuble){
        let a:Article=i
         this.recents.push(i)
      }
      for (let i of this.Terrain){
        let a:Article=i
         this.recents.push(i)
      }
      for (let i of this.Entrepot){
        let a:Article=i
         this.recents.push(i)
      }
      for (let i of this.FondCommerce){
        let a:Article=i
         this.recents.push(i)
      }
      for (let i of this.Boutique){
        let a:Article=i
         this.recents.push(i)
      }
    }

//remonter en haut-----------------------------------------------
    rideUp(){
      document.getElementById("head")?.scrollIntoView();
    }
    rideUp2(id:string){
      document.getElementById(id)?.scrollIntoView();
    }
    getDisplay(){
      if(this.scroll==false){
        return "none"
      }else{
        return "block"
      }
    }
//-----------------------------------------------------------------


}


