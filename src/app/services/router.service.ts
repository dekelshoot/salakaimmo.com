import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  routeSubject = new Subject<string>();
  chargementSubject = new Subject<number>();
  routeActive!: string;
  chargement!: number;
  routes: string[] = []

  emitrouteActive() {
    this.routeSubject.next(this.routeActive)
  }
  emitChargement() {
    this.chargementSubject.next(this.chargement)
  }

  constructor(private router: Router, private articleService: ArticleService) { }

  setRoute(route: string) {
    this.routeActive = route;
    this.emitrouteActive();
  }

  back() {
    if (this.routes.length != 0) {
      this.router.navigate([this.routes[this.routes.length - 1]]);
      this.routes.pop()
    } else {
      this.router.navigate(['/accueil']);
    }
  }

  route(route: string) {
    this.router.navigate([route]);
    this.routes.push(this.router.url)
  }
  routeArticle(id: string) {
    this.articleService.IncrementView(id);
    this.router.navigate(["article/view", id]);
    this.routes.push(this.router.url)
  }


  routeByCat(cat: string) {
    cat = cat.split(' ').join('-');
    this.router.navigate(['/article/categories/' + cat]);
    this.routes.push(this.router.url)
  }

  routeWithQuery(rout: string, navigationExtras: NavigationExtras) {
    this.router.navigate([rout], { queryParams: { ...navigationExtras } });
  }

}
