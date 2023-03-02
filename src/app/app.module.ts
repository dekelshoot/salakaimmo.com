import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StartComponent } from './start/start.component';
import { AccueilBarComponent } from './layouts/accueil-bar/accueil-bar.component';
import { ArraysService } from './services/arrays.service';
import { AboutComponent } from './about/about.component';
import { CategoryComponent } from './category/category.component';
import { SingleArticleComponent } from './start/single-article/single-article.component';
import { AllArticleComponent } from './start/all-article/all-article.component';
import { SearchArticleComponent } from './start/search-article/search-article.component';
import { MenuComponent } from './components/menu/menu.component';
import { ForforComponent } from './components/forfor/forfor.component';
import { MetadataService } from './services/metadata.service';
import { ByCatComponent } from './category/by-cat/by-cat.component';
import { LazyLoadDirective } from './directives/lazy-load.directive';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ArticleNewComponent } from './start/article-new/article-new.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlaceholderComponent } from './layouts/placeholder/placeholder.component';
import { SearchResultComponent } from './start/search-article/search-result/search-result.component';
import { SearchService } from './services/search.service';
import { FooterComponent } from './header/footer/footer.component';
import { StapesComponent } from './layouts/stapes/stapes.component';
import { ContactsComponent } from './layouts/contacts/contacts.component';
import { ConseilsComponent } from './layouts/conseils/conseils.component';
import { ArticleScrollComponent } from './layouts/article-scroll/article-scroll.component';
import { CardComponent } from './layouts/card/card.component';
import { ArticleListComponent } from './layouts/article-list/article-list.component';
import { MenuFooterComponent } from './layouts/menu-footer/menu-footer.component';
import { CatComponent } from './layouts/cat/cat.component';
import { CardMenuComponent } from './layouts/card-menu/card-menu.component';
import { SearchBarComponent } from './layouts/search-bar/search-bar.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CardHorizontalComponent } from './layouts/card-horizontal/card-horizontal.component';
import { SlideArticleComponent } from './layouts/slide-article/slide-article.component';
import { CardPlacehoverComponent } from './layouts/card-placehover/card-placehover.component';
import { ModalFilterComponent } from './layouts/modal-filter/modal-filter.component';
import { TopArticleComponent } from './layouts/top-article/top-article.component';
import { CardHorizontalPlacehoverComponent } from './layouts/card-horizontal-placehover/card-horizontal-placehover.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './services/auth.service';
import { FileService } from './services/file.service';
import { ToastService } from './services/toast.service';
import { ToastComponent } from './layouts/toast/toast.component';
import { ToasterComponent } from './layouts/toaster/toaster.component';
import { PaginationService } from './services/pagination.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LoaderComponent } from './layouts/loader/loader.component';
import { ImportExportComponent } from './components/import-export/import-export.component';
import { ImportexportService } from './services/importexport.service';
import { RouterService } from './services/router.service';
import { ErrorComponent } from './layouts/error/error.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { CardCrudComponent } from './layouts/card-crud/card-crud.component';
import { CardCrudPlaceholderComponent } from './layouts/card-crud-placeholder/card-crud-placeholder.component';
import { HeaderSecondaryComponent } from './layouts/header-secondary/header-secondary.component';
import { AuthGuardService } from './services/auth-guard.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './layouts/modal/modal.component';
import { ModalGuardService } from './services/modal-guard.service';
import { AdvertisementDisableComponent } from './components/advertisement/advertisement-disable/advertisement-disable.component';
import { DisableComponent } from './layouts/card-crud/disable/disable.component';
import { ArticleUpdateComponent } from './start/article-update/article-update.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
    AccueilBarComponent,
    AboutComponent,
    CategoryComponent,
    SingleArticleComponent,
    AllArticleComponent,
    SearchArticleComponent,
    SearchResultComponent,
    MenuComponent,
    ForforComponent,
    ByCatComponent,
    LazyLoadDirective,
    SignInComponent,
    ArticleNewComponent,
    PlaceholderComponent,
    FooterComponent,
    StapesComponent,
    ContactsComponent,
    ConseilsComponent,
    ArticleScrollComponent,
    CardComponent,
    ArticleListComponent,
    MenuFooterComponent,
    CatComponent,
    CardMenuComponent,
    SearchBarComponent,
    SidebarComponent,
    CardHorizontalComponent,
    SlideArticleComponent,
    CardPlacehoverComponent,
    ModalFilterComponent,
    TopArticleComponent,
    CardHorizontalPlacehoverComponent,
    SignupComponent,
    ToastComponent,
    ToasterComponent,
    LoaderComponent,
    ImportExportComponent,
    ErrorComponent,
    AdvertisementComponent,
    CardCrudComponent,
    CardCrudPlaceholderComponent,
    HeaderSecondaryComponent,
    ModalComponent,
    AdvertisementDisableComponent,
    DisableComponent,
    ArticleUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IvyCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    InfiniteScrollModule,
    NgbModule,
  ],
  providers: [
    ArraysService,
    AuthService,
    MetadataService,
    SearchService,
    FileService,
    ToastService,
    PaginationService,
    ImportexportService,
    RouterService,
    AuthGuardService,
    ModalGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
