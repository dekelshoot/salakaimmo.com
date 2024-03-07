import { Component, OnInit } from '@angular/core';
import { ContratService } from 'src/app/services/contrat.service';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-contrats',
  templateUrl: './contrats.component.html',
  styleUrls: ['./contrats.component.scss']
})
export class ContratsComponent implements OnInit {
  loading = true;
  contrats!: any;
  error = false;

  constructor(
    public routerService: RouterService,
    private contratService: ContratService,
  ) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.routerService.setRoute('/contrats')

    this.contratService.getAllContrats().then(
      (data: any) => {
        this.contrats = data;
        console.log(this.contrats)
        this.loading = false;
      }
    ).catch((error: any) => {
      this.loading = false;
    })

  }
}
