import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nos-services',
  templateUrl: './nos-services.component.html',
  styleUrls: ['./nos-services.component.scss']
})
export class NosServicesComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
  }

    
  route(route:string){
    this.router.navigate([route]);
  }

}
