import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './articles/accueil/accueil.component';
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';
import { MenuComponent } from './menu/menu.component';
import { NosServicesComponent } from './nos-services/nos-services.component';
import { AboutComponent } from './about/about.component';
import { ArticleByCatComponent } from './articles/article-by-cat/article-by-cat.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ArticleNewComponent } from './articles/article-new/article-new.component';
import { AdsComponent } from './ads/ads.component';
import { CommentComponent } from './comment/comment.component';
import { SingleArticleComponent } from './articles/single-article/single-article.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ForforComponent } from './forfor/forfor.component';

const routes: Routes = [
  { path: 'accueil', component: AccueilComponent},
  { path: 'categories', component: CategoryComponent} ,
  { path: 'article/category/:cat', component: ArticleByCatComponent} ,
  { path: 'search', component: SearchComponent} ,
  { path: 'menu', component: MenuComponent} ,
  { path: 'services', component: NosServicesComponent} ,
  { path: 'apropos', component: AboutComponent} ,
  { path: 'signin', component: SigninComponent} ,
  { path: 'article/new',canActivate: [AuthGuardService], component: ArticleNewComponent} ,
  { path: 'ads',canActivate: [AuthGuardService], component: AdsComponent} ,
  { path: 'comment', component: CommentComponent} ,
  { path: 'article/view/:id', component: SingleArticleComponent} ,
  { path: '404', component: ForforComponent} ,

  { path : '' , redirectTo: 'accueil', pathMatch: 'full'},
  { path : '**' , redirectTo: '404'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
