import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleNewComponent } from './article-list/article-new/article-new.component';
import { ArticleByCatComponent } from './article-list/article-by-cat/article-by-cat.component';
import { SingleArticleComponent } from './article-list/single-article/single-article.component';
import { AboutComponent } from './about/about.component';
import { ArticleSerchComponent } from './article-list/article-serch/article-serch.component';
import { ForforComponent } from './forfor/forfor.component';
import { ComentComponent } from './comment/comment.component';
import { AdsComponent } from './ads/ads.component';

const routes: Routes = [
  { path: 'accueil', component: ArticleListComponent},
  { path: 'article/new', component: ArticleNewComponent},
  { path: 'article/category/:cat', component: ArticleByCatComponent} ,
  { path: 'auth/signin', component: SigninComponent},
  { path: 'article/search', component: ArticleSerchComponent},
  { path: 'article/view/:id', component: SingleArticleComponent},
  { path : 'about' ,  component : AboutComponent},
  { path : 'comment' ,  component : ComentComponent},
  { path : 'ads' ,  component : AdsComponent},
  { path : '404' ,  component : ForforComponent},
  { path : '' , redirectTo: 'accueil', pathMatch: 'full'},
  { path : '**' , redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
