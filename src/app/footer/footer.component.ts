import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private articleService: ArticleService,
              private router: Router,) { }

  ngOnInit(): void {
  }

  onSwitchCat(cat:string){
    document.getElementById("head")?.scrollIntoView();
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

}
