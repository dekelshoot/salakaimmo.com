import { Component, OnInit } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { RouterService } from '../../services/router.service';
@Component({
  selector: 'app-forfor',
  templateUrl: './forfor.component.html',
  styleUrls: ['./forfor.component.scss']
})
export class ForforComponent implements OnInit {
  time!: number;
  restTime = 5;
  counterSubscription!: Subscription;
  constructor(
    public routerService: RouterService,
  ) { }

  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.timeOut();
  }
  timeOut() {
    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.time = this.restTime - value;
        if (value == 4) {
          setTimeout(
            () => {
              this.routerService.route('/accueil');
            }, 1000
          )
        }
      }
    )

  }


  ngOnDestroy() {
    this.counterSubscription.unsubscribe;
  }
}
