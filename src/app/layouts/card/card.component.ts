import { Component, Input, OnInit } from '@angular/core';
import { RouterService } from '../../services/router.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() article: object | any;
  constructor(public routerService: RouterService) { }

  ngOnInit(): void {
  }
  toDate(date: any) {
    return date.toDate()

  }
  money(a: any) {
    const b = new Intl.NumberFormat().format(a)
    return b;
  }



}
