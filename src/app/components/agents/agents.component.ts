import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterService } from '../../services/router.service';
import { AuthService } from '../../services/auth.service';
import { DealerService } from '../../services/dealer.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  loadingDealers = true;
  dealers!: any;
  error = false;

  constructor(
    public routerService: RouterService, private authService: AuthService, private toastService: ToastService,
    private dealerService: DealerService,) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.routerService.setRoute("/agents");



    this.dealerService.getAllDealers().then(
      (data: any) => {
        this.dealers = data;
        if (this.dealers.length == 0) {
          this.error = true
        }
        this.loadingDealers = false;
      }
    ).catch((error: any) => {
      this.loadingDealers = false;
    })
  }

}
