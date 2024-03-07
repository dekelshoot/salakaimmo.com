import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.scss']
})
export class CatComponent implements OnInit {
  @Input() background: string | any;
  @Input() title: string | any;
  @Input() subTitle: string | any;
  constructor(public routerService: RouterService) { }

  ngOnInit(): void {
    let background2 = this.modifBacground(this.background);

    this.background = `linear-gradient(14deg, rgba(0, 3, 36, 1) 0%, ${this.background} 49%, ${background2}  100%)`
  }


  modifBacground(color: string) {
    let color2 = color.split('(')[1].split(')')[0].split(',')
    color2[0] = ((parseInt(color2[0], 10) + 20) > 255) ? "" + 255 : ("" + (parseInt(color2[0], 10) + 20));
    color2[1] = ((parseInt(color2[0], 10) + 20) > 255) ? "" + 255 : ("" + (parseInt(color2[0], 10) + 20));
    color2[0] = ((parseInt(color2[0], 10) + 20) > 255) ? "" + 255 : ("" + (parseInt(color2[0], 10) + 10));
    console.log(color2.join())
    color = "rgba(" + color2.join() + ")"
    return color
  }

}
