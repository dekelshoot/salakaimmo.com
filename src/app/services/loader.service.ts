import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  start = false;
  startSubject= new Subject<boolean>();
  constructor() { }

  emitStart(){
    this.startSubject.next(this.start);
  }

  initStart(){
    this.start=true
    setTimeout(
      ()=>{
        this.start = false;
        this.emitStart()
      },2000
    )
  }
}
