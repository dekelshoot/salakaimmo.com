import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { RouterService } from 'src/app/services/router.service';
import { v4 as uuidv4 } from 'uuid';
import { ArraysService } from '../../services/arrays.service';
import { FileService } from 'src/app/services/file.service';
import { ArticleService } from '../../services/article.service';
import { EventTypes } from 'src/app/models/event-types';
import { ToastService } from 'src/app/services/toast.service';
import { Timestamp } from 'firebase/firestore';
@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.scss']
})
export class ArticleUpdateComponent {

  articleForm!: FormGroup;
  loading = false;
  fileUploading = false;
  fileUploaded = false;
  fileUrl = new Array<string>();
  nomberFile = 0;
  urls = new Array<string>();
  location!: string[];
  category!: string[];
  choixEquipe!: string[];
  typeExchange!: string[];
  AppartementALouer: Article[] = [];
  AppartementALouerSubscription!: Subscription;
  start = true
  datePublication = new Date();
  charge = [5, 5, 5, 5, 5, 5, 5, 5];
  rout = ""


  data: any = {
    titre: "",
    prix: 0,
    superficie: "",
    detailPiece: "",
    modalite: "",
    nombrePiece: 0,
    lieu: "",
    accessibilite: "",
    securite: "",
    parking: "",
    eauElectricite: "",
    categorie: "",
    description: "",
    nombreChambre: 0,
  }

  id = ""



  constructor(private formBuilder: FormBuilder,
    private arraysService: ArraysService,
    private routerService: RouterService,
    private fileService: FileService,
    private articleService: ArticleService,
    private toastService: ToastService,
    private routes: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.initForm();
    if (localStorage.getItem("salakaImmoArticleToUpdate") != null) {
      let data1: any = localStorage.getItem("salakaImmoArticleToUpdate")
      let data: any = JSON.parse(data1);
      this.id = data.id;
      // this.data = Object.assign(this.data, data);
      for (let key in data) {
        if (key in this.data) {
          this.data[key] = data[key];
        }
      }
      console.log(this.data)
      data.photo = ""
      this.articleForm?.setValue(this.data);
    } else {
      this.routerService.route('/ads')
    }
    this.routerService.setRoute("/article/new");
    this.location = this.arraysService.location;
    this.category = this.arraysService.category;
    this.typeExchange = this.arraysService.typeExchange;
  }

  //initialid=ser le formulaire
  initForm() {
    this.articleForm = this.formBuilder.group({

      titre: ['', Validators.required],
      description: ['', Validators.required],
      categorie: ['', Validators.required],
      detailPiece: [''],
      modalite: [''],
      nombrePiece: [''],
      nombreChambre: [''],
      accessibilite: [''],
      securite: [''],
      parking: [''],
      eauElectricite: [''],
      superficie: [''],
      lieu: ['', Validators.required],
      prix: ['', Validators.required],
    })
  }

  ngOnChanges(): void {
    let data = this.articleForm.value
    localStorage.setItem("salakaImmoDataNewArticle", JSON.stringify(data))
  }

  //sauvegarder les iformations dans la base donnee
  onSaveProperty() {
    const titre = this.articleForm.get('titre')?.value;
    const description = this.articleForm.get('description')?.value;
    const categorie = this.articleForm.get('categorie')?.value;
    const detailPiece = this.articleForm.get('detailPiece')?.value;
    const modalite = this.articleForm.get('modalite')?.value;
    const nombrePiece = this.articleForm.get('nombrePiece')?.value;
    const nombreChambre = this.articleForm.get('nombreChambre')?.value;
    const accessibilite = this.articleForm.get('accessibilite')?.value;
    const securite = this.articleForm.get('securite')?.value;
    const parking = this.articleForm.get('parking')?.value;
    const eauElectricite = this.articleForm.get('eauElectricite')?.value;
    const superficie = this.articleForm.get('superficie')?.value;
    const lieu = this.articleForm.get('lieu')?.value;
    const prix = this.articleForm.get('prix')?.value;




    const article = new Article();


    if (categorie == "Appartement à louer") {
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.nombreChambre = nombreChambre;
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange = "A louer";

    } else if (categorie == "Appartement à vendre") {
      article.detailPiece = detailPiece;
      article.nombreChambre = nombreChambre;
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.parking = parking;
      article.typeEchange = "A vendre";

    } else if (categorie == "Appartement meublé") {
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.nombreChambre = nombreChambre;
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange = "A louer";

    } else if (categorie == "Maison à louer") {
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.nombreChambre = nombreChambre;
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange = "A vendre";

    } else if (categorie == "Maison à vendre") {
      article.detailPiece = detailPiece;
      article.nombreChambre = nombreChambre;
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.securite = securite;
      article.parking = parking;
      article.typeEchange = "A louer";

    } else if (categorie == "Maison  meubé") {
      article.detailPiece = detailPiece;
      article.nombreChambre = nombreChambre;
      article.modalite = modalite;
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.typeEchange = "A louer";

    } else if (categorie == "Chambre à louer") {
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange = "A louer";

    } else if (categorie == "Chambre meublé") {
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange = "A louer";

    } else if (categorie == "Studio à louer") {

      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange = "A louer";

    } else if (categorie == "Studio meublé") {
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange = "A louer";

    } else if (categorie == "Terrain") {
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A vendre";

    } else if (categorie == "Boutique") {
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    } else if (categorie == "Usine") {
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    } else if (categorie == "Entrepot") {
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    } else if (categorie == "Fond de commerce") {
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    } else if (categorie == "Magasin") {
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    }



    article.titre = titre;
    article.description = description;
    article.categorie = categorie;
    article.lieu = lieu;
    article.prix = prix;

    this.loading = true;

    console.log(article, this.id)
    this.articleService.updateArticle(article, this.id).then(
      () => {
        this.loading = true;
        this.toastService.showToast(EventTypes.Success, "Success", "Modification effectuée :)");
        localStorage.removeItem("salakaImmoArticleToUpdate")
        this.routerService.route('/article/view/' + this.id);
        this.loading = false;
      }
    ).catch((error) => {
      this.loading = false;
      console.log(error);
      this.toastService.showToast(EventTypes.Error, "Warning", "un problème est survenu lors de la modification :(")
    });


  }



}
