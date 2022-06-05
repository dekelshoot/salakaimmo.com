import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from '../../services/article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArrayService } from 'src/app/services/array.service';

@Component({
  selector: 'app-article-by-cat',
  templateUrl: './article-by-cat.component.html',
  styleUrls: ['./article-by-cat.component.scss']
})
export class ArticleByCatComponent implements OnInit {
  caterySubscription!:Subscription;
  category="";
  lieu!:string[];
  articles: Article[]=[];
  articless: Article[]=[];
  lieuForm!: FormGroup;
  filter = "date";
  spinner = true;
  constructor(private router: Router,
              private routes: ActivatedRoute,
              private articleService:ArticleService,
              private array: ArrayService,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.lieu =this.array.location
    this.category=this.routes.snapshot.params["cat"].replace(/_/g," "); 
    this.articleService.getArticle(this.category).then(
     (data:any)=>{
       this.articles=data
       this.articless=data
       this.spinner=false
     },(error:any)=>{
      //  console.log(error )
        this.spinner=false;
     }
   )
   this.initForm()
  
  }

  initForm(){
    this.lieuForm = this.formBuilder.group({ 
      lieu:['', Validators.required],
    })
  }
  onFilterLieu(){
    const lieu = this.lieuForm.get('lieu')?.value;
    this.articles=this.trieLieu(lieu)
    if(this.articles.length==0){
      this.articles=this.articless
    }

  } 
  route(route:string){
    this.router.navigate([route]);
  }
  replace(data:string){
    return data.replace(/ /g,"-");
  }
  rideUp(){
    document.getElementById("head")?.scrollIntoView();
  }
  rideUp2(id:string){
    document.getElementById(id)?.scrollIntoView();
  }

  money(a:any){
    const b= new Intl.NumberFormat().format(a)
    return b;
  }


  onFilter(filter:string){
    document.getElementById("head")?.scrollIntoView();
    this.filter = filter;
    if(filter == "date"){
      this.articles=this.trieDate(this.articless)
      }
    else if(filter == "prixCroissant"){
      this.articles=this.trieDown(this.articless)
      }
    else if(filter == "prixDecroissant"){
      this.articles=this.trieTop(this.articless)  
    }
    else if(filter == "filter"){  
    }

  }

  trieLieu(lieu:string){
    const len = this.articless.length
    const articles=[]
      for (let i =0; i < len; i++) {
        if (this.articless[i].lieu == lieu) {
          articles.push(this.articless[i])
        }
      }
      return articles
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
  



}
