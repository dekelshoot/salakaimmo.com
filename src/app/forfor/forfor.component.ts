import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval } from 'rxjs/internal/observable/interval';
import { Subscription } from 'rxjs/internal/Subscription';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-forfor',
  templateUrl: './forfor.component.html',
  styleUrls: ['./forfor.component.scss']
})
export class ForforComponent implements OnInit {
  time!:number;
  restTime=5;
  counterSubscription!: Subscription;
  constructor(private articleService: ArticleService,
              private router: Router) { }

  ngOnInit(): void {
    this.articleService.start=false;
    this.articleService.emitStart(); 
    this.timeOut();
  }

  timeOut(){
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value:number)=>{
        this.time = this.restTime-value;
        if(value==5){
          this.articleService.start=true;
          this.articleService.emitStart();
          setTimeout(
            ()=>{
              this.articleService.start=false;
              this.articleService.emitStart();
              this.router.navigate( ['/accueil']);
            },1000
          )
        }
      }
    )
    
  }
  
  onBack(){
    this.router.navigate( ['/accueil']);
  }

  ngOnDestroy(){
    this.counterSubscription.unsubscribe;
  }
  

}
