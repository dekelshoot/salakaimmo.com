import { Injectable } from '@angular/core';
import {  doc, getFirestore, query, orderBy, limit, collection, getDocs, startAfter, setDoc } from "firebase/firestore";
import { FirebaseConfigService } from './firebase-config.service';
import { getAuth } from "firebase/auth";
import { runTransaction } from "firebase/firestore";
import { Subject } from 'rxjs';
import { Comment } from '../models/comment.model';


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments: Comment[] = [];
  start = false;
  commentSubject = new Subject<Comment[]>();
  startSubject = new Subject<boolean>();
  first !: any;
  querySnapshot !: any;
  constructor(private firebaseConfigService: FirebaseConfigService) { }


  //emetre les les subjects pour permetre leur utilisation
  emitArticle() {
    this.commentSubject.next(this.comments);
  }

  emitStart() {
    this.startSubject.next(this.start);
  }

  /**
  * creer un nouvau commentair
  */
  createNewComment(newComment: Comment): any {
    const app = this.firebaseConfigService.app
    const db = getFirestore(app);
    return new Promise((resolve, reject) => {
      setDoc(doc(db, "comments", newComment.id), {
        ...newComment
      }).then(() => {
        resolve("user created successfully")
      }).catch((error) => {
        reject(error);
      })
    });
  }



  /**
 * récuperer les commentaires les plus rescent de la bas de donnée
 */
  getComment() {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "comments");
      const q = query(articleRef, orderBy("datePublication", "desc"), limit(10));
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
        reject(" pas de commaentaires")
      }
    });
  }

  /**
* récuperer les commentaire de la page suivante (pour la pagination)
*/
  getNextPage() {
    return new Promise<any>(async (resolve, reject) => {
      // Get the last visible document
      if (this.querySnapshot) {
        const lastVisible = this.querySnapshot.docs[this.querySnapshot.docs.length - 1];
        const app = this.firebaseConfigService.app
        const db = getFirestore(app);
        const articleRef = collection(db, "comments");
        // Construct a new query starting at this document,
        // get the next 18 cities.
        const next = query(articleRef,
          orderBy("datePublication", "desc"),
          startAfter(lastVisible),
          limit(10));

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
          reject("plus de commentaires")
        }
      } else {
        reject()
      }

    })
  }

}
