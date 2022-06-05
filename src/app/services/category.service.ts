import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
category=""
categorySubject = new Subject<string>();
  constructor() { }

  emitCat(){
    this.categorySubject.next(this.category);
  }
  changeCat(cat:string){
    this.category=cat;
    this.emitCat();
  }
}
