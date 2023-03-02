import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArraysService } from 'src/app/services/arrays.service';

@Component({
  selector: 'app-top-article',
  templateUrl: './top-article.component.html',
  styleUrls: ['./top-article.component.scss']
})
export class TopArticleComponent implements OnInit {
  @Input() articles: Array<any>=[];
  constructor(private router: Router,) { }
  placehover=["","","","","",""]

  ngOnInit(): void {

}

  money(a:any){
    const b= new Intl.NumberFormat().format(a)
    return b;
  }

  replace(data:string){
    return data.replace(/ /g,"-");
  }

  routeArticle(cat: string,id:string) {
    this.router.navigate(['/article/view/'+this.replace(cat)+'-'+id]);

  }
}
