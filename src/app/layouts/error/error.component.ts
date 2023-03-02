import { Component, Input } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input() title!: string;
  @Input() errorMessage!: string;
  @Input() instruction!: string;
  @Input() rout!: string;
  constructor(public routerService: RouterService) { }

}
