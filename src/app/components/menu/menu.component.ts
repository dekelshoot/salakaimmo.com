import { Component, OnInit, ViewChild } from '@angular/core';
import { ArraysService } from '../../services/arrays.service';
import { RouterService } from '../../services/router.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../../services/auth.service';
import { DealerService } from '../../services/dealer.service';
import { ModalConfig } from 'src/app/layouts/newsletter/modal.config';
import { NewsletterComponent } from '../../layouts/newsletter/newsletter.component';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChild('modal') private modal!: NewsletterComponent
  articles!: Array<any>;
  article!: any;
  isAuthSubscription!: Subscription;
  isAuth: boolean = false;
  color!: string[];
  dealer!: any;
  dealers!: any;
  loading = false;
  success = false;
  error = false;
  loadingDealer = true;
  loadingDealers = true;
  placeholder = ["", "", "", "", ""]
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
  constructor(
    public routerService: RouterService, private authService: AuthService,private toastService: ToastService,
    private dealerService: DealerService,) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.routerService.setRoute("/menu");
    if (localStorage.getItem("salakaimmouser") != null) {
      this.isAuth = true;
      console.log(localStorage.getItem("salakaimmouser"))
      let id = localStorage.getItem("salakaimmouser")
      this.authService.getSingleDealer(id).then(
        (data: any) => {
          this.dealer = data;
          this.loadingDealer = false;
        }
      ).catch((error: any) => {
        this.loadingDealer = false;
      })
    } else {
      this.loadingDealer = false;
      this.isAuth = false;
    }


    this.dealerService.getAllDealers().then(
      (data: any) => {
        this.dealers = data;
        this.loadingDealers = false;
      }
    ).catch((error: any) => {
      this.loadingDealers = false;
    })
  }

  signOut() {
    this.authService.signOut();
    this.isAuth = false;
    this.dealer = null
    localStorage.removeItem("salakaimmouser")
  }

  async openModal() {
    return await this.modal.open()
  }

  onNewsLetter() {
    this.success = false;
    this.error = false;
    this.modalConfig = {
      ...this.modalConfig,
      modalTitle: "suppression",
      modalBody: "Voulez-vous vraiment supprimer cet article ?",
      validateButtonLabel: "Supprimer",
      closeButtonLabel: "Annuler",
    }
    this.openModal().then((decision) => { })
  }

}
