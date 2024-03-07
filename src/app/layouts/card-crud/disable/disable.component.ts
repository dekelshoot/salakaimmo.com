import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { EventTypes } from 'src/app/models/event-types';
import { ModalComponent } from '../../modal/modal.component';
import { ModalConfig, ModalConfigLoader } from '../../modal/modal.config';
import { ArticleService } from 'src/app/services/article.service';
import { ToastService } from 'src/app/services/toast.service';
import { AdvertisementDisableComponent } from '../../../components/advertisement/advertisement-disable/advertisement-disable.component';

@Component({
  selector: 'app-card-crud-disable',
  templateUrl: './disable.component.html',
  styleUrls: ['./disable.component.scss']
})
export class DisableComponent {
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
    private advertisementDisableComponent: AdvertisementDisableComponent,
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
        this.articleService.deleteSingleArticleDisable(this.article.id).then((response) => {
          this.success = true;
          this.loading = false;
          console.log(this.success)
          this.advertisementDisableComponent.onDelete(this.article)
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
    console.log("suppression................................................................", this.article)
  }

  onActive() {
    this.modalConfig = {
      ...this.modalConfig,
      modalTitle: "Activation",
      modalBody: "Voulez-vous vraiment activer  cet article ?",
      validateButtonLabel: "Activer",
      closeButtonLabel: "Annuler",
    }
    this.openModal().then((decision) => {
      this.error = false;
      this.success = false;
      if (decision == true) {
        this.modalConfigLoader = {
          ...this.modalConfigLoader,
          modalTitle: "Activation",
          modalBody: "Activation ...",
          validateButtonLabel: "ok",
          error: "Échec de l'activation",
          success: "Activation réussie"
        }
        this.loading = true;
        this.openModalLoader()
        this.articleService.activeSingleArticle(this.article).then((response) => {
          this.success = true;
          this.loading = false;
          console.log(this.success)
          this.advertisementDisableComponent.onDelete(this.article)
          this.modal.validateLoader();
          this.toastService.showToast(EventTypes.Success, "Success", "Activation réussit :)")
        }).catch((error) => {
          this.loading = false;
          this.error = true;
          this.modal.validateLoader();
          this.toastService.showToast(EventTypes.Error, "Error", "Échec de l'activation :(")
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
