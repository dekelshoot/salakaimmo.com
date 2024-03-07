import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';
import { ToastService } from 'src/app/services/toast.service';
import { EventTypes } from 'src/app/models/event-types';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Leads } from 'src/app/models/leads.model';
import { LeadsService } from 'src/app/services/leads.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  newsLetterForm!: FormGroup;
  loading!: Boolean
  constructor(public routerService: RouterService, private formBuilder: FormBuilder,
    private toastService: ToastService, private leadsService: LeadsService) { }
  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.newsLetterForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email,])],
    })
  }

  onSaveNewsLetter() {
    const email = this.newsLetterForm.get('email')?.value;

    const newsletter = new Leads();
    if (email) {
      newsletter.email = email;
    }
    console.log(newsletter);

    this.loading = true;
    this.leadsService.createNewLeads(newsletter).then(
      () => {
        this.loading = true;
        this.toastService.showToast(EventTypes.Success, "Success", "Votre abonnement a été enregistré :)");
        this.loading = false;
        this.newsLetterForm.setValue({ email: '' })
      }
    ).catch((error: any) => {
      this.loading = false;
      console.log(error);
      this.toastService.showToast(EventTypes.Error, "Warning", "un problème est survenu :(")
    });


  }

}
