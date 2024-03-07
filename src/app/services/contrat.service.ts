import { Injectable } from '@angular/core';
// import { increment, doc, updateDoc, getDoc, getFirestore, query, orderBy, limit, collection, getDocs, where, startAfter, setDoc, deleteDoc } from "firebase/firestore";
import { Subject } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { FirebaseConfigService } from './firebase-config.service';
import { getAuth } from "firebase/auth";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, increment, limit, orderBy, query, runTransaction, setDoc, startAfter, updateDoc, where } from "firebase/firestore";


@Injectable({
  providedIn: 'root'
})
export class ContratService {
  contrats: Array<any> = [];
  // Query the first page of docs
  first !: any;
  querySnapshot !: any;
  constructor(private firebaseConfigService: FirebaseConfigService) { }


  /**
* récuperer les contrats pour la fil d'actualité
*/
  getAllContrats() {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "contrats");
      const q = query(articleRef, orderBy("datePublication", "desc"));
      const querySnapshot = await getDocs(q);
      this.first = q;
      this.querySnapshot = querySnapshot;
      let data: any = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      if (data) {
        resolve(data);
      } else {
        reject("Ce contrat n'existe pas")
      }
    });
  }

  /**
* creer un nouvel contrat
*/
  createNewContrat(newContrat: any) {
    const app = this.firebaseConfigService.app
    const db = getFirestore(app);
    return new Promise((resolve, reject) => {
      setDoc(doc(db, "contrats", newContrat.id), {
        ...newContrat, dealerId: getAuth().currentUser?.uid
      }).then(() => {
        resolve("contrat created successfully")
      }).catch((error) => {
        reject(error);
      })
    });
  }
}
