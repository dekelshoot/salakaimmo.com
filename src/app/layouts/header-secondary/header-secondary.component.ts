import { Component, Input } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-header-secondary',
  templateUrl: './header-secondary.component.html',
  styleUrls: ['./header-secondary.component.scss']
})
export class HeaderSecondaryComponent {
  @Input() route!: string;
  constructor(
    public routerService: RouterService

  ) { }
}
