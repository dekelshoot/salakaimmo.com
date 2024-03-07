import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArraysService } from 'src/app/services/arrays.service';
import { RouterService } from '../../services/router.service';


@Component({
  selector: 'app-card-horizontal',
  templateUrl: './card-horizontal.component.html',
  styleUrls: ['./card-horizontal.component.scss']
})
export class CardHorizontalComponent implements OnInit {
  @Input() article: object | any;
  constructor(public routerService: RouterService, private arraysService: ArraysService) { }

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
