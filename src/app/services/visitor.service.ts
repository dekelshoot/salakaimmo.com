import { Injectable } from '@angular/core';
import { getDatabase, ref,set, onValue } from "firebase/database";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  visitorSubject =  new Subject<number>();
  visitors!: number;
  constructor() { }

   //sauvegarder les articles dans la base de donnée
   saveAndIncrementVisitors(){
    const db = getDatabase();
    set(ref(db, 'visitors/'), this.visitors+1);
  }
  saveAndDecrementVisitors(){
    const db = getDatabase();
    set(ref(db, 'visitors/'), this.visitors-1);
  }

  emitVisitor(){
    this.visitorSubject.next(this.visitors)
  }

   //recuperer le nombre de visiteur de la base de donnéee
   getVisitors(){
    const db = getDatabase();
    const visitorref = ref(db, '/visitors');
    return new Promise(
      (resolve, reject)=>{
        onValue(visitorref, (snapshot) => {
          resolve(snapshot.val());
          const data = snapshot.val();
          this.visitors = data;
          this.emitVisitor();
          },(error:any)=>{
          reject(error)
          }
        );
      }
    )

  }



}
