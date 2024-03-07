import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RouterService } from 'src/app/services/router.service';
@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {

  loadingDealer = true;
  error = false;
  dealer!: any;
  isAuth: boolean = false;
  hrefWa!: string;
  hrefSms!: string;
  hrefMail!: string;
  hrefTel!: string;
  constructor(public routerService: RouterService, private authService: AuthService,
    private routes: ActivatedRoute,) { }


  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.routerService.setRoute("/profil");
    let id = this.routes.snapshot.params['id']
    this.authService.getSingleDealer(id).then(
      (data: any) => {
        this.dealer = data;
        if (this.dealer.length == 0) {
          this.error = true
        }
        this.getDealerInfo(this.dealer);
        this.loadingDealer = false;
      }
    ).catch((error: any) => {
      this.loadingDealer = false;
    })


  }

  getDealerInfo(dealer: any) {
    //gerer les lien de contact avec le client
    this.hrefWa = "http://wa.me/" + dealer?.phoneNumber + "?text=je%20vous%20contacte%20de%20salakaimmo.com%20";
    this.hrefTel = "tel:" + dealer?.phoneNumber;
    this.hrefMail = "mailto:" + dealer?.email + "?subject=Recherche de logement&body=j'ai vu votre annonce sur salakaimmo " + window.location + " S'il vous plait , envoyez moi plus d' information à ce sujet "

  }
}
