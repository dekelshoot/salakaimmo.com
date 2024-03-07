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
import { CommentComponent } from './components/comment/comment.component';
import { AccueilBarComponent } from './layouts/accueil-bar/accueil-bar.component';
import { ProfilComponent } from './components/profil/profil.component';
import { EditComponent } from './components/profil/edit/edit.component';
import { AgentsComponent } from './components/agents/agents.component';
import { AgentComponent } from './components/agents/agent/agent.component';
import { ContratsComponent } from './components/contrats/contrats.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { ServicesComponent } from './components/services/services.component';
import { AboutComponent } from './components/about/about.component';
import { ContactsComponent } from './components/contacts/contacts.component';



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
  { path: 'profil', component: ProfilComponent },
  { path: 'agents', component: AgentsComponent },
  { path: 'agents/:id', component: AgentComponent },
  { path: 'edit', component: EditComponent },
  { path: 'contrats', component: ContratsComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'apropos', component: AboutComponent },
  { path: 'contacts', component: ContactsComponent },


  // { path: 'importexport', component: ImportExportComponent },
  { path: 'commentaire', component: CommentComponent },

  { path: 'bar', component: AccueilBarComponent },

  { path: '', pathMatch: 'full', component: StartComponent },
  // { path: 'crud', component: CardCrudComponent },

  { path: '404', component: ForforComponent },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
