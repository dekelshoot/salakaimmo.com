import { Injectable } from '@angular/core';
import { getDatabase, ref, set, onValue } from 'firebase/database';
import { doc, getFirestore, Timestamp, setDoc } from "firebase/firestore";
import { FirebaseConfigService } from './firebase-config.service';
import { getAuth } from "firebase/auth";


@Injectable({
  providedIn: 'root'
})
export class ImportexportService {

  constructor(private firebaseConfigService: FirebaseConfigService) { }

  importData() {
    const app = this.firebaseConfigService.app
    const db = getFirestore(app);
    return new Promise(async (resolve, reject) => {
      let data: any = {}
      await fetch("../../assets/bd.json")
        .then(response => {
          return response.json();
        })
        .then(jsondata => {
          jsondata.map((data: any) => {
            data.id = data.categorie.replace(/ /g, "-") + "-" + data.id
            data.dealerEmail = "juniortchoupe@gmail.com";
            data.dealerId = getAuth().currentUser?.uid
            data.datePublication = Timestamp.fromDate(new Date(data.datePublication))
          })
          data = jsondata;
        });
      console.log(data);
      data.map((newArticle: any, index: number) => {
        setDoc(doc(db, "articles", newArticle.id), {
          ...newArticle,
        }).then(() => {
          console.log(index);
          if (index == data.length - 1) {
            resolve("fin de l'importation")
          }
        }).catch((error) => {
          reject(error);
        })
      })
    });
  }
}
