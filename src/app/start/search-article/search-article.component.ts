import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { RouterService } from 'src/app/services/router.service';
import { ArraysService } from '../../services/arrays.service';


@Component({
  selector: 'app-search-article',
  templateUrl: './search-article.component.html',
  styleUrls: ['./search-article.component.scss']
})
export class SearchArticleComponent implements OnInit {
  articles!: Array<any>;
  mots!: string[]
  color!: string[];
  category!: string[];
  typeBien!: string[];
  chambre!: string[];
  prix!: string[];
  lieu!: string[];
  searchForm!: FormGroup;
  valid = false;
  searchForm2!: FormGroup;
  popularWords: string[] = []
  viewChambre = false;
  articleSearch: Article[] = [];
  searchView = false;
  start = false;
  search = ""
  constructor(public arraysService: ArraysService,
    public routerService: RouterService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.routerService.setRoute("/article/recherche");
    this.articles = this.arraysService.articles;
    this.mots = this.arraysService.popularWords;
    this.color = this.arraysService.color;
    this.category = this.arraysService.category;
    this.typeBien = this.arraysService.category;
    this.chambre = this.arraysService.chambre;
    this.prix = this.arraysService.prix;
    this.lieu = this.arraysService.location;
    this.initForm();
    this.initForm2();

  }
  setActive() {
    document.querySelector(".recherches")?.classList.toggle("active")
  }





  // initialiser le formulaire
  initForm() {
    this.searchForm = this.formBuilder.group({
      // transaction:['', Validators.required],
      type: ['', Validators.required],
      chambre: ['',],
      prix: ['', Validators.required],
      lieu: ['', Validators.required],
    })
  }
  initForm2() {
    this.searchForm2 = this.formBuilder.group({
      categorie: ['', Validators.required],
    })
  }

  onSearchArticle2() {
    const categorie = this.searchForm2.get('categorie')?.value;
    this.routeWithCat(categorie);
  }

  onSearchArticle() {
    const type = this.searchForm.get('type')?.value;
    const chambre = this.searchForm.get('chambre')?.value;
    const prix = this.searchForm.get('prix')?.value;
    const lieu = this.searchForm.get('lieu')?.value;

    let searchObject: any;
    if (type == "Terrain" || type == "Studio à louer" || type == "Fond de commerce" || type == "Fond de commerce" || type == "Boutique" || type == "Studio meublé" || type == "Chambre meublé" || type == "Chambre à louer" || type == "Entrepot" || this.searchForm.value.type == "Fond de commerce" || type == "Magasin" || type == "Autre" || type == "Usine") {
      searchObject = {
        // transaction: transaction,
        type: type,
        prix: prix,
        lieu: lieu
      }
    } else {
      searchObject = {
        // transaction: transaction,
        type: type,
        chambre: chambre.split(" ")[0] * 1,
        prix: prix,
        lieu: lieu
      }
    }
    console.log(searchObject)
    this.initsearch(searchObject)


  }
  routeWithCat(cat: string) {
    this.routerService.route('article/category/' + cat.replace(/ /g, "_"));
  }

  validSearch() {
    this.valid = false
    const search = this.searchForm2.get('categorie')?.value;
    for (let i in this.arraysService.category) {
      if (i == search) {
        this.valid = true
      }
    }
  }


  Chambre() {
    if (this.searchForm.value.type == "Terrain" || this.searchForm.value.type == "Studio à louer" || this.searchForm.value.type == "Fond de commerce" || this.searchForm.value.type == "Fond de commerce" || this.searchForm.value.type == "Boutique" || this.searchForm.value.type == "Studio meublé" || this.searchForm.value.type == "Chambre meublé" || this.searchForm.value.type == "Chambre à louer" || this.searchForm.value.type == "Entrepot" || this.searchForm.value.type == "Fond de commerce" || this.searchForm.value.type == "Magasin" || this.searchForm.value.type == "Autre" || this.searchForm.value.type == "Usine") {
      this.viewChambre = true;
    } else {
      this.viewChambre = false;
    }
  }

  videArticle() {
    this.articleSearch = [];
    this.searchView = false;
  }

  initsearch(searchObject: any) {
    const navigationExtras: NavigationExtras = {
      ...searchObject
    };
    console.log(navigationExtras);
    this.routerService.routeWithQuery('/article/search', navigationExtras)
  }


  onSearch(searchObject: any, data: any) {
    if (this.objectSize(searchObject) == 4) {
      for (let article of data) {
        if (article.nombreChambre == searchObject.chambre.slice(0, 1)) {
          if (article.lieu == searchObject.lieu) {
            this.searchPrix(article, searchObject.prix)
          } else {
            //  break;
          }
        } else {
          //  break;
        }
      }


    } else {
      for (let article of data) {
        if (article.lieu == searchObject.lieu) {
          this.searchPrix(article, searchObject.prix)
        } else {
          //  break;
        }
      }

    }


  }



  //determiner la taille de l'object
  objectSize(object: any) {
    let size = 0, key;
    for (key in object) {
      if (object.hasOwnProperty(key)) size++;
    }
    return size;
  };


  searchPrix(a: any, b: string) {
    let prix = b.slice(0, 1)
    if (prix == "0") {
      if (0 <= a.prix && a.prix <= 50000) {
        this.articleSearch.push(a);
      }
    } else if (prix == "5") {
      if (50000 <= a.prix && a.prix <= 150000) {
        this.articleSearch.push(a);
      }
    } else if (prix == "1") {
      if (150000 <= a.prix && a.prix <= 300000) {
        this.articleSearch.push(a);
      }
    } else if (prix == "3") {
      if (300000 <= a.prix && a.prix <= 500000) {
        this.articleSearch.push(a);
      }
    } else if (prix == ">") {
      if (a.prix >= 500000) {
        this.articleSearch.push(a);
      }
    }

  }

  replace(data: string) {
    return data.replace(/ /g, "-");
  }

  money(a: any) {
    const b = new Intl.NumberFormat().format(a)
    return b;
  }


}
