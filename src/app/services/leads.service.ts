import { Injectable } from '@angular/core';
import { addDoc, doc, getFirestore, query, orderBy, limit, collection, getDocs, startAfter, setDoc } from "firebase/firestore";
import { FirebaseConfigService } from './firebase-config.service';
import { getAuth } from "firebase/auth";
import { runTransaction } from "firebase/firestore";
import { Subject } from 'rxjs';
import { Leads } from '../models/leads.model';
@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  leads: Leads[] = [];

  first !: any;
  querySnapshot !: any;
  constructor(private firebaseConfigService: FirebaseConfigService) { }



  /**
  * creer un nouvau leads
  */
  createNewLeads(leads: Leads): any {

    const app = this.firebaseConfigService.app
    const db = getFirestore(app);
    return new Promise((resolve, reject) => {
      if (leads.email || leads.phoneNumber) {
        addDoc(collection(db, "leads"), {
          ...leads
        }).then(() => {
          resolve("leads created successfully")
        }).catch((error) => {
          reject(error);
        })
      } else {
        reject()
      }
    });


  }



  //   /**
  //  * récuperer les commentaires les plus rescent de la bas de donnée
  //  */
  //   getComment() {
  //     return new Promise(async (resolve, reject) => {
  //       const app = this.firebaseConfigService.app
  //       const db = getFirestore(app);
  //       const articleRef = collection(db, "comments");
  //       const q = query(articleRef, orderBy("datePublication", "desc"), limit(10));
  //       const querySnapshot = await getDocs(q);
  //       this.first = q;
  //       this.querySnapshot = querySnapshot;
  //       let data: any = []
  //       querySnapshot.forEach((doc) => {
  //         data.push(doc.data());
  //       });
  //       if (data) {
  //         resolve(data);
  //       } else {
  //         reject(" pas de commaentaires")
  //       }
  //     });
  //   }

  //   /**
  // * récuperer les commentaire de la page suivante (pour la pagination)
  // */
  //   getNextPage() {
  //     return new Promise<any>(async (resolve, reject) => {
  //       // Get the last visible document
  //       if (this.querySnapshot) {
  //         const lastVisible = this.querySnapshot.docs[this.querySnapshot.docs.length - 1];
  //         const app = this.firebaseConfigService.app
  //         const db = getFirestore(app);
  //         const articleRef = collection(db, "comments");
  //         // Construct a new query starting at this document,
  //         // get the next 18 cities.
  //         const next = query(articleRef,
  //           orderBy("datePublication", "desc"),
  //           startAfter(lastVisible),
  //           limit(10));

  //         const querySnapshot = await getDocs(next);
  //         this.first = next;
  //         this.querySnapshot = querySnapshot;
  //         let data: any = []
  //         querySnapshot.forEach((doc) => {
  //           data.push(doc.data());
  //         });
  //         if (data) {
  //           resolve(data);
  //         } else {
  //           reject("plus de commentaires")
  //         }
  //       } else {
  //         reject()
  //       }

  //     })
  //   }

}
