import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { ModalConfig, ModalConfigLoader } from './modal.config';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';
import { EventTypes } from 'src/app/models/event-types';
import { LeadsService } from '../../services/leads.service';
import { Leads } from '../../models/leads.model';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.scss']
})
export class NewsletterComponent implements OnInit {
  newsLetterForm!: FormGroup;
  choice = "email"
  @Input() public modalConfig!: ModalConfig
  @Input() public modalConfigLoader!: ModalConfigLoader
  @Input() public loading!: Boolean
  @Input() public success!: Boolean
  @Input() public error!: Boolean
  @ViewChild('modal') private modalContent!: TemplateRef<ModalComponent>
  private modalRef!: NgbModalRef
  @ViewChild('modalLoader') private modalContentLoader!: TemplateRef<ModalComponent>
  private modalLoaderRef!: NgbModalRef
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    private toastService: ToastService, private leadsService: LeadsService) { }

  ngOnInit(): void {
    this.initForm();
  }

  //initialid=ser le formulaire
  initForm() {
    this.newsLetterForm = this.formBuilder.group({

      email: ['', Validators.email],
      phoneNumber: [''],
    })
  }

  onSaveNewsLetter() {
    const email = this.newsLetterForm.get('email')?.value;
    const phoneNumber = this.newsLetterForm.get('phoneNumber')?.value;


    const newsletter = new Leads();
    if (email) {
      newsletter.email = email;
    }
    if (phoneNumber) {
      newsletter.phoneNumber = phoneNumber;
    }
    console.log(newsletter);

    this.loading = true;
    this.leadsService.createNewLeads(newsletter).then(
      () => {
        this.close()
        this.loading = true;
        this.toastService.showToast(EventTypes.Success, "Success", "Votre abonnement a été enregistré :)");
        this.loading = false;
      }
    ).catch((error: any) => {
      this.loading = false;
      console.log(error);
      this.toastService.showToast(EventTypes.Error, "Warning", "un problème est survenu :(")
    });


  }

  onChangeChoice(choice: string) {
    this.choice = choice;
    this.initForm();
  }

  open(): Promise<boolean> {
    this.initForm();
    return new Promise<boolean>(resolve => {
      this.modalRef = this.modalService.open(this.modalContent, { centered: true })
      this.modalRef.result.then(resolve, resolve)
    })
  }

  openLoader(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      this.modalLoaderRef = this.modalService.open(this.modalContentLoader, { centered: true })
      this.modalLoaderRef.result.then(resolve, resolve)
    })
  }



  async close(): Promise<void> {
    if (this.modalConfig.shouldClose === undefined || (await this.modalConfig.shouldClose())) {
      const result = this.modalConfig.onClose === undefined || (await this.modalConfig.onClose())
      this.modalRef.close(result)
    }
  }

  async validate(): Promise<void> {
    if (this.modalConfig.shouldValidate === undefined || (await this.modalConfig.shouldValidate())) {
      const result = this.modalConfig.onValidate === undefined || (await this.modalConfig.onValidate())
      this.modalRef.dismiss(result)
    }
  }

  async validateLoader(): Promise<void> {
    if (this.modalConfigLoader.shouldValidate === undefined || (await this.modalConfigLoader.shouldValidate())) {
      const result = this.modalConfigLoader.onValidate === undefined || (await this.modalConfigLoader.onValidate())
      this.modalLoaderRef.dismiss(result)
    }
  }
}
