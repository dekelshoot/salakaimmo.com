import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Dealer } from 'src/app/models/dealer.model';
import { AuthService } from 'src/app/services/auth.service';
import { DealerService } from 'src/app/services/dealer.service';
import { FileService } from 'src/app/services/file.service';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.scss']
})
export class SingleArticleComponent implements OnInit {
  sameArticle:Article[]=[];
  articles:Article[]=[];
  article!: Article;
  link= new Array
  hrefWa!:string;
  hrefSms!:string;
  hrefMail!:string;
  hrefTel!:string;
  startSubject!: Subscription;
  start = false;
  dealer!:Dealer;
  dealers!:Dealer[];
  categorie!:string;
  constructor(private router: Router,
              private routes:ActivatedRoute,
              private articleService:ArticleService,
              private dealerService:DealerService,
              private fileService:FileService,
              private authService:AuthService) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    let route =this.routes.snapshot.params['id']
    let categorie=route.slice(0,-32).replace(/-/g," ")
    categorie= categorie.slice(0,-1)
    this.categorie=categorie;
    let id = route.slice(-32)
    this.articleService.getArticle(categorie).then(
      (data:any)=>{
        let articles:Article[]=data;
        this.articles = articles;
        for(let i=0;i<articles.length;i++){
          if(articles[i].id==id){
             this.article=articles[i]
             this.articleService.IncrementView(categorie,i,this.article)
             this.same(this.article);
             for(let photo in this.article.photo){
               this.link.push(this.article.photo[photo]);
             }
          }
          
        }
        this.dealerService.getDealer().then(
          (data:any)=>{
            this.dealers= data;
            this.getDealerInfo(this.dealers);
          }
        )
      }
      
    )

    

    document.getElementById("head")?.scrollIntoView();
  }

  scroolToContact(id:string){
    document.getElementById(id)?.scrollIntoView();
  }
  route(route:string){
    this.router.navigate(['accueil']);
    setTimeout(
      ()=>{
        this.router.navigate([route]);
      },0.0000000000001
    )
  }
  slideConfig2 = {
    "slidesToShow": 1, 
    "slidesToScroll": 1, 
    "autoplay":true, 
    "autoplaySpeed":5000, 
    "dots":true, 
    "infinite": true,
  };

  same(searchObject:any){
    for(let article of this.articles){
      if(article.typeEchange == searchObject.typeEchange){
        if(article.categorie == searchObject.categorie){
          if(article.lieu == searchObject.lieu){
            if(article.description == searchObject.description){
            }else{
              if(this.sameArticle.length<=4 ){
                this.sameArticle.push(article)
              }
              
            }
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
  }
  getDealerInfo(dealers:any){
    for(let i of dealers){
      if(this.article.dealerEmail==i.email){
        //gerer les lien de contact avec le client
        this.dealer=i;
        this.hrefWa = "http://wa.me/"+i.tel+"?text=j'ai%20vu%20votre%20annonce%20sur%20ETS%20Salaka%20"+window.location+"%20S'il%20vous%20plait%20,%20envoyez%20moi%20plus%20d'%20information%20à%20ce%20sujet%20";
        this.hrefTel="tel:+"+i.tel;
        this.hrefSms = "sms:/"+"+"+i.tel+"/?body=j'ai vu votre annonce sur ETS Salaka "+window.location+" S'il vous plait , envoyez moi plus d' information à ce sujet";

        this.hrefMail = "mailto:"+i.email+"?subject=Recherche de logement&body=j'ai vu votre annonce sur ETS Salaka "+window.location+" S'il vous plait , envoyez moi plus d' information à ce sujet "
      //_____________________________________________
      }
    }
  }
  reaload(){
    this.ngOnInit();
  }

  money(a:any){
    const b= new Intl.NumberFormat().format(a)
    return b;
  }


  getAuth(){
    if(this.authService.auth){
      if(this.authService.auth.currentUser?.email==this.article.dealerEmail){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
    
  }
  replace(data:string){
    return data.replace(/ /g,"-");
  }

  


   

}
