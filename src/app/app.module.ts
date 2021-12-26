import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { SingleArticleComponent } from './article-list/single-article/single-article.component';
import { ArticleByCatComponent } from './article-list/article-by-cat/article-by-cat.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleSerchComponent } from './article-list/article-serch/article-serch.component';
import { ArticleNewComponent } from './article-list/article-new/article-new.component';
import { AboutComponent } from './about/about.component';
import { AuthService } from './services/auth.service';
import { ArticleService } from './services/article.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ArraysListService } from './services/arrays-list.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';
import { ForforComponent } from './forfor/forfor.component';
import { ComentComponent } from './comment/comment.component';
import { AdsComponent } from './ads/ads.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    ArticleListComponent,
    SingleArticleComponent,
    ArticleByCatComponent,
    FooterComponent,
    ArticleSerchComponent,
    ArticleNewComponent,
    AboutComponent,
    ForforComponent,
    ComentComponent,
    AdsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    AuthService,
    ArticleService,
    AuthGuardService,
    ArraysListService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
