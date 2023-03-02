import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllArticleComponent } from './start/all-article/all-article.component';
import { SearchArticleComponent } from './start/search-article/search-article.component';
import { StartComponent } from './start/start.component';
import { MenuComponent } from './components/menu/menu.component';
import { CategoryComponent } from './category/category.component';
import { SingleArticleComponent } from './start/single-article/single-article.component';
import { ForforComponent } from './components/forfor/forfor.component';
import { ByCatComponent } from './category/by-cat/by-cat.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ArticleNewComponent } from './start/article-new/article-new.component';
import { SearchResultComponent } from './start/search-article/search-result/search-result.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ImportExportComponent } from './components/import-export/import-export.component';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CardCrudComponent } from './layouts/card-crud/card-crud.component';
import { AdvertisementDisableComponent } from './components/advertisement/advertisement-disable/advertisement-disable.component';
import { ArticleUpdateComponent } from './start/article-update/article-update.component';



const routes: Routes = [
  { path: 'accueil', component: StartComponent },
  { path: 'article/view/:id', component: SingleArticleComponent },
  { path: 'article/recherche', component: SearchArticleComponent },
  { path: 'article/search', component: SearchResultComponent },
  { path: 'article/categories', component: CategoryComponent },
  { path: 'article/new', canActivate: [AuthGuardService], component: ArticleNewComponent },
  { path: 'article/update', canActivate: [AuthGuardService], component: ArticleUpdateComponent },
  { path: 'auth/sign-in', component: SignInComponent },
  { path: 'auth/sign-up', component: SignupComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'article/fil-actualite', component: AllArticleComponent },
  { path: 'article/categories/:cat', component: ByCatComponent },
  { path: 'ads', canActivate: [AuthGuardService], component: AdvertisementComponent },
  { path: 'ads/disable', canActivate: [AuthGuardService], component: AdvertisementDisableComponent },
  { path: 'importexport', component: ImportExportComponent },

  { path: '', redirectTo: 'accueil', pathMatch: 'full' },

  { path: 'crud', component: CardCrudComponent },

  { path: '404', component: ForforComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
