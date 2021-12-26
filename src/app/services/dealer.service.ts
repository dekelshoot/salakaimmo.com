import { Injectable } from '@angular/core';

import { getDatabase, ref, onValue } from "firebase/database";
import { Dealer } from '../models/dealer.model';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  dealers: Dealer[]=[];
  constructor() { }



  getDealer(){
    const db = getDatabase();
    const dealerRef = ref(db, '/dealer')
    return new Promise(
      (resolve, reject)=>{

        onValue(dealerRef, (snapshot) => {
          resolve(snapshot.val());
          const data = snapshot.val();
          this.dealers = data;
          },(error:any)=>{
          reject(error)
          }
        );
      }
    )
  }
}
