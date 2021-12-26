import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article} from 'src/app/models/article.model';
import { ArraysListService } from '../../services/arrays-list.service';
import { ArticleService } from '../../services/article.service';
import { FileService } from '../../services/file.service';
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {

  
  articleForm!: FormGroup;
  loading = false;
  fileUploading = false;
  fileUploaded = false;
  fileUrl = new Array<string>();
  nomberFile = 0;
  urls = new Array<string>();
  location!:string[];
  category!:string[];
  typeExchange!:string[];
  datePublication = new Date();

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private arraysListService: ArraysListService,
              private fileService: FileService,
              private router: Router
  ) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.articleService.getArticle();
    this.initForm();
    this.location = this.arraysListService.location;
    this.category = this.arraysListService.category;
    this.typeExchange = this.arraysListService.typeExchange;
  }

//initialid=ser le formulaire
  initForm(){
    this.articleForm = this.formBuilder.group({ 

      titre:['', Validators.required],
      description:['', Validators.required],
      categorie:['', Validators.required],
      detailPiece:[''],
      modalite:[''],
      nombrePiece:[''],
      nombreChambre:[''],
      accessibilite:[''],
      securite:[''],
      parking:[''],
      eauElectricite:[''],
      superficie:[''],
      photo: ['', Validators.required],
      lieu:['', Validators.required],
      prix:['', Validators.required],
    })
  }


//sauvegarder les iformations dans la base donnee
  onSaveProperty(){
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
   
    const auth = getAuth();


    const article = new Article();


    if(categorie =="Appartement à louer"){
      article.id = 0;
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.nombreChambre = nombreChambre; 
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite; 
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange= "A louer";

    }else if(categorie =="Appartement à vendre"){

      article.id = 0;
      article.detailPiece = detailPiece;
      article.nombreChambre = nombreChambre; 
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite; 
      article.superficie = superficie;
      article.securite = securite;
      article.parking = parking;
      article.typeEchange= "A vendre";

    }else  if(categorie =="Appartement meublé"){

      article.id = 0;
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.nombreChambre = nombreChambre; 
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite; 
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange= "A louer";

    }else if(categorie =="Maison à louer"){

      article.id = 0;
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.nombreChambre = nombreChambre; 
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite; 
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange= "A vendre";

    }else if(categorie =="Maison à vendre"){

      article.id = 0;
      article.detailPiece = detailPiece;
      article.nombreChambre = nombreChambre; 
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite; 
      article.superficie = superficie;
      article.securite = securite;
      article.parking = parking;
      article.typeEchange= "A louer";

    }else if(categorie =="Chambre à louer"){

      article.id = 0;
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite; 
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange= "A louer";

    }if(categorie =="Studio à louer"){

      article.id = 0;
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite; 
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange= "A louer";

    }else if(categorie =="Studio meublé"){

      article.id = 0;
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite; 
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange= "A louer";

    }else if(categorie =="Terrain"){

      article.id = 0;
      article.accessibilite = accessibilite; 
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange= "A vendre";

    }else if(categorie =="Boutique"){

      article.id = 0;
      article.accessibilite = accessibilite; 
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    }
    // else if(categorie =="Fond de commerce"){

    //   article.id = 0;
    //   article.accessibilite = accessibilite; 
    //   article.superficie = superficie;
    //   article.modalite = modalite;
    //   article.typeEchange = "A vendre";
      
    // }



    article.titre = titre;
    article.description = description;
    article.categorie = categorie;
    article.lieu = lieu;
    article.prix = prix;
    article.nombreVu=0;
    article.nombrePhoto= this.fileUrl.length;
    article.datePublication = this.datePublication.toString();
    article.dealerEmail = auth.currentUser?.email;
    if(this.fileUrl){
      article.photo = this.fileUrl;
    }
    

    this.articleService.createNewArticle(article);
    this.loading = true;
    setTimeout(
      ()=>{
        this.router.navigate( ['/accueil']);
        this.loading = false;
      },1000
    );
  }


//uploader les images dans la base de donnee
  onUploadFile(file: File){
    this.fileUploading= true;
    this.fileService.uploadFile(file).then(
      (url:any)=>{
        this.fileUrl.push(url);
        this.fileUploading= false;
        this.fileUploaded = true;
      }
    )
   
  }


//detecter les images selectionnes par l'utilisateur
  detectFiles(event:any) {
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        this.onUploadFile(file);
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.nomberFile = this.urls.length;
        }
        reader.readAsDataURL(file);
      }
    }
    
  }

  onBack(){
    this.router.navigate( ['/accueil']);
  }


}

