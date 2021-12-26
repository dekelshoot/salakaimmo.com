import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Dealer } from 'src/app/models/dealer.model';
import { ArticleService } from '../../services/article.service';
import { DealerService } from '../../services/dealer.service';
import { FileService } from '../../services/file.service';
import { AuthService } from 'src/app/services/auth.service';

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
  constructor(private route: ActivatedRoute,
              private router: Router,
              private articleService:ArticleService,
              private dealerService:DealerService,
              private fileService:FileService,
              private authService:AuthService) { }

  ngOnInit(): void {
    //___________________
    document.getElementById("head")?.scrollIntoView();
  

    this.articles = this.articleService.articles;
    
    this.article = new  Article();
    const id = this.route.snapshot.params['id'];
    this.articleService.getSingleArticle(+id).then(
      (article:any) =>{
        this.article = article; 
        this.same(article);
        for(let photo in this.article.photo){
          this.link.push(this.article.photo[photo]);
        }
        this.articleService.start= false;
        this.articleService.emitStart();
        this.dealerService.getDealer().then(
          ()=>{
            this.getDealerInfo();
          }
        )
        
      }
    );



  }

  same(searchObject:any){
    for(let [i,article] of this.articles.entries()){
      if(article.typeEchange == searchObject.typeEchange){
        if(article.categorie == searchObject.categorie){
          if(article.lieu == searchObject.lieu){
            if(article.description == searchObject.description){
            }else{
              article.id = i;
              this.sameArticle.push(article)
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

  onViewProperty(id:number){
    this.vue(id)
    this.router.navigate( ['/accueil']);
    setTimeout(
      ()=>{
        this.router.navigate( ['/article','view', id]);
      },0
    )
  
  }

  getDealerInfo(){
    for(let i of this.dealerService.dealers){
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

  scroll(id:string){
    document.getElementById(id)?.scrollIntoView();
  }

  onBack(){
    this.router.navigate( ['/accueil']);

  }
  
delete(){
  this.fileService.removeFile(this.article)
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

vue(i:number){
  this.articles[i].nombreVu=this.articles[i].nombreVu+1
  this.articleService.articles=this.articles
  this.articleService.saveArticles();
  this.articleService.emitArticle()
}
}
