import { Component, OnInit } from '@angular/core';
import { RouterService } from 'src/app/services/router.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  hrefWa = "http://wa.me/" + "+23798684872" + "?text=je%20vous%20contacte%20depuis%20salakaimmo.com%20";
  hrefTel = "tel:" + "+23798684872";
  hrefSms = "sms:/" + "+23798684872" + "/?body=je vous contacte depuis salakaimmo.com";
  hrefMail = "mailto:" + "juniortchoupe@gmail.com" + "?subject=Prise de contact&body=je vous contacte depuis salakaimmo.com"
  constructor(
    public routerService: RouterService,
  ) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.routerService.setRoute('/contacts')

  }
}
