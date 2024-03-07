import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss']
})
export class PlaceholderComponent implements OnInit {
  placeholder = ['', '', ''];
  placeholder2 = ['', ''];
  constructor() { }

  ngOnInit(): void {
  }

}
