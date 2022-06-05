import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccueilComponent } from './articles/accueil/accueil.component';
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';
import { ArrayService } from './services/array.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ArticleByCatComponent } from './articles/article-by-cat/article-by-cat.component';
import { MenuComponent } from './menu/menu.component';
import { NosServicesComponent } from './nos-services/nos-services.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ArticleNewComponent } from './articles/article-new/article-new.component';
import { AdsComponent } from './ads/ads.component';
import { SingleArticleComponent } from './articles/single-article/single-article.component';
import { CommentComponent } from './comment/comment.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AuthService } from './services/auth.service';
import { ArticleService } from './services/article.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CategoryService } from './services/category.service';
import { CommentService } from './services/comment.service';
import { Dealer } from './models/dealer.model';
import { DealerService } from './services/dealer.service';
import { FileService } from './services/file.service';
import { ForforComponent } from './forfor/forfor.component';
import { VisitorService } from './services/visitor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccueilComponent,
    CategoryComponent,
    SearchComponent,
    ArticleByCatComponent,
    MenuComponent,
    NosServicesComponent,
    AboutComponent,
    FooterComponent,
    SigninComponent,
    ArticleNewComponent,
    AdsComponent,
    SingleArticleComponent,
    CommentComponent,
    ForforComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SlickCarouselModule
  ],
  providers: [
    ArrayService,
    AuthService,
    ArticleService,
    AuthGuardService,
    CategoryService,
    CommentService,
    DealerService,
    FileService,
    VisitorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
