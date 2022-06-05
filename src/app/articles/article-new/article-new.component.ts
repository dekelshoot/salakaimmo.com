import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Article} from 'src/app/models/article.model';
import { ArticleService } from '../../services/article.service';
import { FileService } from '../../services/file.service';
import { getAuth,  } from "firebase/auth";
import { ArrayService } from '../../services/array.service';
import { v4 as uuidv4 } from 'uuid';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.scss']
})
export class ArticleNewComponent implements OnInit {


  articleForm!: FormGroup;
  loading = true;
  fileUploading = false;
  fileUploaded = false;
  fileUrl = new Array<string>();
  nomberFile = 0;
  urls = new Array<string>();
  location!:string[];
  category!:string[];
  choixEquipe!:string[];
  typeExchange!:string[];
  AppartementALouer: Article[] = [] ;
  AppartementALouerSubscription! : Subscription;
  start=false
  datePublication = new Date();
  charge=[5,5,5,5,5,5,5,5];
  rout=""

  constructor(private formBuilder: FormBuilder,
              private articleService: ArticleService,
              private arrayService: ArrayService,
              private fileService: FileService,
              private router: Router
  ) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.AppartementALouerSubscription = this.articleService.AppartementALouerSubject.subscribe(
      ( AppartementALouer: Article[]) =>{
        this.AppartementALouer= AppartementALouer;
        this.start = true
      }
    );
    this.articleService.startAccueil();
    this.initForm();
    this.location = this.arrayService.location;
    this.category = this.arrayService.category;
    this.typeExchange = this.arrayService.typeExchange;
    // this.choixEquipe = this.arrayService.choixEquipe;
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
      // choixEquipe: ['', Validators.required],
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
    const id = uuidv4().replace(/-/g,"")
    // const choixEquipe = this.articleForm.get('choixEquipe')?.value;

    const auth = getAuth();


    const article = new Article();


    if(categorie =="Appartement à louer"){
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
      article.detailPiece = detailPiece;
      article.nombreChambre = nombreChambre;
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.parking = parking;
      article.typeEchange= "A vendre";

    }else  if(categorie =="Appartement meublé"){
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
      article.detailPiece = detailPiece;
      article.nombreChambre = nombreChambre;
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.securite = securite;
      article.parking = parking;
      article.typeEchange= "A louer";

    }else if(categorie =="Maison  meubé"){
      article.detailPiece = detailPiece;
      article.nombreChambre = nombreChambre;
      article.modalite = modalite;
      article.nombrePiece = nombrePiece;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.typeEchange= "A louer";

    }else if(categorie =="Chambre à louer"){
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange= "A louer";

    }else if(categorie =="Chambre meublé"){
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange= "A louer";

    }else if(categorie =="Studio à louer"){

      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange= "A louer";

    }else if(categorie =="Studio meublé"){
      article.detailPiece = detailPiece;
      article.modalite = modalite;
      article.accessibilite = accessibilite;
      article.securite = securite;
      article.parking = parking;
      article.eauElectricite = eauElectricite;
      article.typeEchange= "A louer";

    }else if(categorie =="Terrain"){
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange= "A vendre";

    }else if(categorie =="Boutique"){
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    }else if(categorie =="Usine"){
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    }else if(categorie =="Entrepot"){
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    }else if(categorie =="Fond de commerce"){
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    }else if(categorie =="Magasin"){
      article.accessibilite = accessibilite;
      article.superficie = superficie;
      article.modalite = modalite;
      article.typeEchange = "A louer";

    }



    article.titre = titre;
    article.id=id;
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
    this.rout="article/view/"+article.categorie.replace(/ /g,"-")+"-"+article.id
    this.loading = true;
    this.articleService.createNewArticle(article).then(
      ()=>{
        // this.router.navigate( ['/accueil']);
        this.loading = false;
      }
    )
  }


//uploader les images dans la base de donnee
  onUploadFile(file: File, i:number){
    this.fileUploading= true;
    this.fileService.uploadFile(file).then(
      (url:any)=>{
        this.fileUrl.push(url);
        this.charge[i]=100;
        setTimeout(
          ()=>{
            this.fileUploading= false;
            this.fileUploaded = true;
          },2000
        )
      }
    )

  }


//detecter les images selectionnes par l'utilisateur
  detectFiles(event:any) {
    let files = event.target.files;
    let i =0;
    if (files) {
      for (let file of files) {
        if(i<=7){
          this.onUploadFile(file,i);
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push(e.target.result);
            this.nomberFile = this.urls.length;
          }
          reader.readAsDataURL(file);
          i++;
        }
      }
    }

  }

  route(route:string){
    this.router.navigate([route]);
  }

}

