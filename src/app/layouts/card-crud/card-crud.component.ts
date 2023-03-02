import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { EventTypes } from 'src/app/models/event-types';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig, ModalConfigLoader } from '../modal/modal.config';
import { ArticleService } from 'src/app/services/article.service';
import { AdvertisementComponent } from '../../components/advertisement/advertisement.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-card-crud',
  templateUrl: './card-crud.component.html',
  styleUrls: ['./card-crud.component.scss']
})
export class CardCrudComponent implements OnInit {
  @Input() article: any;
  loading = false;
  success = false;
  error = false;
  @ViewChild('modal') private modal!: ModalComponent

  public modalConfig: ModalConfig = {
    modalTitle: "",
    modalBody: "",
    validateButtonLabel: "",
    closeButtonLabel: "",

    onValidate: () => {
      return true
    },
    onClose: () => {
      return false
    },
  }

  public modalConfigLoader: ModalConfigLoader = {
    modalTitle: "",
    modalBody: "",
    validateButtonLabel: "",
    error: "",
    success: "",


    onValidate: () => {
      return true
    },
  }
  constructor(public routerService: RouterService,
    private toastService: ToastService,
    private articleService: ArticleService,
    private advertisementComponent: AdvertisementComponent,
  ) { }

  ngOnInit(): void {
    // this.article = this.arraysService.articles[0]

  }

  async openModal() {
    return await this.modal.open()
  }

  async openModalLoader() {
    return await this.modal.openLoader()
  }

  toDate(date: any) {
    return date.toDate()

  }

  onDelete() {
    this.success = false;
    this.error = false;
    this.modalConfig = {
      ...this.modalConfig,
      modalTitle: "suppression",
      modalBody: "Voulez-vous vraiment supprimer cet article ?",
      validateButtonLabel: "Supprimer",
      closeButtonLabel: "Annuler",
    }
    this.openModal().then((decision) => {
      if (decision == true) {
        this.modalConfigLoader = {
          ...this.modalConfigLoader,
          modalTitle: "suppression",
          modalBody: "suppression ...",
          validateButtonLabel: "ok",
          error: "Échec de la suppression",
          success: "Suppression réussie"
        }
        this.loading = true;
        this.openModalLoader()
        this.articleService.deleteSingleArticle(this.article.id).then((response) => {
          this.success = true;
          this.loading = false;
          console.log(this.success)
          this.advertisementComponent.onDelete(this.article)
          this.modal.validateLoader();
          this.toastService.showToast(EventTypes.Success, "Success", "Suppression réussit :)")
        }).catch((error) => {
          this.loading = false;
          this.error = true;
          this.modal.validateLoader();
          this.toastService.showToast(EventTypes.Error, "Error", "Échec de la suppressin :(")
          console.log(error);
        });
      }
    })
  }
  onEdit() {
    this.modalConfig = {
      ...this.modalConfig,
      modalTitle: "Modification",
      modalBody: "Voulez-vous vraiment modifier cet article ?",
      validateButtonLabel: "Modifier",
      closeButtonLabel: "Annuler",
    }
    this.openModal().then((decision) => {
      if (decision == true) {
        localStorage.setItem("salakaImmoArticleToUpdate", JSON.stringify(this.article))
        this.routerService.route('/article/update')
      }
    })

  }
  onShare() {

    console.log("Partage................................................................", this.article)
  }
  onDisable() {
    this.modalConfig = {
      ...this.modalConfig,
      modalTitle: "Désactivation",
      modalBody: "Voulez-vous vraiment désactiver  cet article ?",
      validateButtonLabel: "Désactiver",
      closeButtonLabel: "Annuler",
    }
    this.openModal().then((decision) => {
      this.error = false;
      this.success = false;
      if (decision == true) {
        this.modalConfigLoader = {
          ...this.modalConfigLoader,
          modalTitle: "Désactivation",
          modalBody: "Désactivation ...",
          validateButtonLabel: "ok",
          error: "Échec de la désactivation",
          success: "Désactivation réussie"
        }
        this.loading = true;
        this.openModalLoader()
        this.articleService.disableSingleArticle(this.article).then((response) => {
          this.success = true;
          this.loading = false;
          console.log(this.success)
          this.advertisementComponent.onDelete(this.article)
          this.modal.validateLoader();
          this.toastService.showToast(EventTypes.Success, "Success", "Désactivation réussit :)")
        }).catch((error) => {
          this.loading = false;
          this.error = true;
          this.modal.validateLoader();
          this.toastService.showToast(EventTypes.Error, "Error", "Échec de la désactivation :(")
          console.log(error);
        });
      }
      console.log(decision);
    })

  }



  money(a: any) {
    const b = new Intl.NumberFormat().format(a)
    return b;
  }

}
