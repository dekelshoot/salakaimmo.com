import { Injectable } from '@angular/core';
import { doc, getDoc, getFirestore, query, orderBy, limit, collection, getDocs, where, startAfter } from "firebase/firestore";
import { Subject } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { Router } from '@angular/router';
import { ArraysService } from './arrays.service';
import { FirebaseConfigService } from './firebase-config.service';
import { getAuth } from "firebase/auth";



@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  articles: Article[] = [];
  constructor(private firebaseConfigService: FirebaseConfigService) { }

  // Query the first page of docs
  first !: any;
  querySnapshot !: any;



  getAllArticle() {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "articles");
      const q = query(articleRef, orderBy("datePublication", "desc"), limit(2));
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
        reject("Cette article n'existe pas")
      }
    });
  }

  getNextPage() {
    return new Promise<any>(async (resolve, reject) => {
      // Get the last visible document
      console.log(this.querySnapshot)
      if (this.querySnapshot) {
        const lastVisible = this.querySnapshot.docs[this.querySnapshot.docs.length - 1];
        const app = this.firebaseConfigService.app
        const db = getFirestore(app);
        const articleRef = collection(db, "articles");
        // Construct a new query starting at this document,
        // get the next 25 cities.
        const next = query(articleRef,
          orderBy("datePublication", "desc"),
          startAfter(lastVisible),
          limit(2));

        const querySnapshot = await getDocs(next);
        this.first = next;
        this.querySnapshot = querySnapshot;
        let data: any = []
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        if (data) {
          resolve(data);
        } else {
          reject("Cette article n'existe pas")
        }
      } else {
        reject()
      }

    })
  }


  getNextPageByCat(category: string) {
    return new Promise<any>(async (resolve, reject) => {
      // Get the last visible document
      const lastVisible = this.querySnapshot.docs[this.querySnapshot.docs.length - 1];

      if (this.querySnapshot) {
        const lastVisible = this.querySnapshot.docs[this.querySnapshot.docs.length - 1];
      } else {
        reject()
      }
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "articles");
      // Construct a new query starting at this document,
      // get the next 25 cities.
      const next = query(articleRef,
        orderBy("datePublication", "desc"),
        startAfter(lastVisible),
        limit(2));

      const querySnapshot = await getDocs(next);
      this.first = next;
      this.querySnapshot = querySnapshot;
      let data: any = []
      querySnapshot.forEach((doc) => {
        data.push(doc.data());
      });
      if (data) {
        resolve(data);
      } else {
        reject("Cette article n'existe pas")
      }
    })
  }


}


