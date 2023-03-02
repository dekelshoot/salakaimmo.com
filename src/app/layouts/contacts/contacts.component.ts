import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  @Input() data!: Contact | undefined;
  hrefWa!: string;
  hrefSms!: string;
  hrefMail!: string;
  hrefTel!: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }



}
