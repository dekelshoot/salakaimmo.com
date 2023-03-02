import { Injectable } from '@angular/core';
import { increment, doc, updateDoc, getDoc, getFirestore, query, orderBy, limit, collection, getDocs, where, startAfter, setDoc, deleteDoc } from "firebase/firestore";
import { Subject } from 'rxjs';
import { Article } from 'src/app/models/article.model';
import { FirebaseConfigService } from './firebase-config.service';
import { getAuth } from "firebase/auth";
import { runTransaction } from "firebase/firestore";

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articles: Article[] = [];
  choixEquipe: Article[] = [];
  articleRecent: Article[] = [];
  MaisonALouer: Article[] = [];
  MaisonMeuble: Article[] = [];
  MaisonAVendre: Article[] = [];
  Terrain: Article[] = [];
  Boutique: Article[] = [];
  FondCommerce: Article[] = [];
  Entrepot: Article[] = [];
  Usine: Article[] = [];
  Magasin: Article[] = [];
  AppartementALouer: Article[] = [];
  AppartementMeuble: Article[] = [];
  AppartementAVendre: Article[] = [];
  studioALouer: Article[] = [];
  studioMeuble: Article[] = [];
  chambreALouer: Article[] = [];
  chambreMeuble: Article[] = [];
  Autre: Article[] = [];
  start = true;
  // Query the first page of docs
  first !: any;
  querySnapshot !: any;

  constructor(private firebaseConfigService: FirebaseConfigService) { }
  categorySubject = new Subject<string>();



  //sauvegarder les articles dans la base de donnée

  async IncrementView(id: string) {
    if (localStorage.getItem("salakaimmouser") == null) {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const docRef = doc(db, "articles", id);
      await updateDoc(docRef, {
        nombreVu: increment(1)
      });
    }
  }


  /**
* supprimer une article de la base de données à partir de son id
*/
  deleteSingleArticle(id: string) {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const docRef = doc(db, "articles", id);
      await deleteDoc(docRef).then((value) => {
        resolve(value);
      }).catch((err) => {
        reject(err);
      });

    });
  }

  /**
* supprimer une article de la base de données à partir de son id
*/
  deleteSingleArticleDisable(id: string) {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const docRef = doc(db, "disables", id);
      await deleteDoc(docRef).then((value) => {
        resolve(value);
      }).catch((err) => {
        reject(err);
      });

    });
  }

  /**
* desactiver une article  à partir de son id
*/
  disableSingleArticle(article: any) {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      try {
        await runTransaction(db, async (transaction) => {
          const deletDocRef = doc(db, "articles", article.id);
          const disableDocRef = doc(db, "disables", article.id);
          await transaction.delete(deletDocRef);
          await transaction.set(disableDocRef, article);
        });
        resolve("Transaction successfully committed!")
        console.log("Transaction successfully committed!");
      } catch (e) {
        reject(e)
        console.log("Transaction failed: ", e);
      }
    })
  }


  /**
* activer une article à partir de son id
*/
  activeSingleArticle(article: any) {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      try {
        await runTransaction(db, async (transaction) => {
          const deletDocRef = doc(db, "disables", article.id);
          const disableDocRef = doc(db, "articles", article.id);
          await transaction.delete(deletDocRef);
          await transaction.set(disableDocRef, article);
        });
        resolve("Transaction successfully committed!")
        console.log("Transaction successfully committed!");
      } catch (e) {
        reject(e)
        console.log("Transaction failed: ", e);
      }
    })
  }

  /**
 * recuperer une article de la base de données à partir de son id
 */
  getSingleArticle(id: string) {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const docRef = doc(db, "articles", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        resolve(docSnap.data());
      } else {
        reject("Cette article n'existe pas")
      }
    });
  }


  /**
   * récuperer les articles les plus rescent de la bas de donnée
   */
  getMoreRecentArticles() {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "articles");
      const q = query(articleRef, orderBy("datePublication", "desc"), limit(6));
      const querySnapshot = await getDocs(q);
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


  /**
  * récuperer les articles par catégorie de la bas de donnée
  */
  getArticleByCategory(category: string) {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "articles");
      const q = query(articleRef, where("categorie", "==", category), orderBy("datePublication", "desc"), limit(18));
      const querySnapshot = await getDocs(q);
      this.first = q;
      this.querySnapshot = querySnapshot
      let data: any = []
      if (querySnapshot.docs) {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        resolve(data);
      } else {
        reject("Cette article n'existe pas")
      }
    });
  }

  /**
  * récuperer les articles pour l'accueil
  */
  getArticleForHomme(category: string) {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "articles");
      const q = query(articleRef, where("categorie", "==", category), orderBy("datePublication", "desc"), limit(6));
      const querySnapshot = await getDocs(q);
      let data: any = []
      if (querySnapshot.docs) {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        resolve(data);
      } else {
        reject("Cette article n'existe pas")
      }
    });
  }

  /**
* récuperer les avec un query
*/
  getArticleByQuery(queryParams: any) {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "articles");
      let q = queryParams.chambre ? query(articleRef, where("categorie", "==", queryParams.type), where("lieu", "==", queryParams.lieu), where("nombreChambre", "==", queryParams.chambre * 1), orderBy("datePublication", "desc"), limit(18)) : query(articleRef, where("categorie", "==", queryParams.type), where("lieu", "==", queryParams.lieu), orderBy("datePublication", "desc"), limit(18));
      const querySnapshot = await getDocs(q);
      this.first = q;
      this.querySnapshot = querySnapshot
      let data: any = []
      if (querySnapshot.docs) {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        resolve(data);
      } else {
        reject("Cette article n'existe pas")
      }
    });
  }

  /**
* récuperer les articles d'un user
*/
  getArticleByUser() {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "articles");
      let id = localStorage.getItem("salakaimmouser")
      let q = query(articleRef, where("dealerId", "==", id), orderBy("datePublication", "desc"), limit(18));
      const querySnapshot = await getDocs(q);
      this.first = q;
      this.querySnapshot = querySnapshot
      let data: any = []
      if (querySnapshot.docs) {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        resolve(data);
      } else {
        reject("Cette article n'existe pas")
      }
    });
  }

  /**
* récuperer les articles des activées d'un user
*/
  getArticleDisableByUser() {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "disables");
      let id = localStorage.getItem("salakaimmouser")
      let q = query(articleRef, where("dealerId", "==", id), orderBy("datePublication", "desc"), limit(18));
      const querySnapshot = await getDocs(q);
      this.first = q;
      this.querySnapshot = querySnapshot
      let data: any = []
      if (querySnapshot.docs) {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        resolve(data);
      } else {
        reject("Cette article n'existe pas")
      }
    });
  }





  /**
* récuperer les articles pour la fil d'actualité
*/
  getAllArticle() {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "articles");
      const q = query(articleRef, orderBy("datePublication", "desc"), limit(18));
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

  /**
* récuperer les articles de la page suivante (pour la pagination)
*/
  getNextPage() {
    return new Promise<any>(async (resolve, reject) => {
      // Get the last visible document
      if (this.querySnapshot) {
        const lastVisible = this.querySnapshot.docs[this.querySnapshot.docs.length - 1];
        const app = this.firebaseConfigService.app
        const db = getFirestore(app);
        const articleRef = collection(db, "articles");
        // Construct a new query starting at this document,
        // get the next 18 cities.
        const next = query(articleRef,
          orderBy("datePublication", "desc"),
          startAfter(lastVisible),
          limit(18));

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

  /**
  * récuperer les articles de la page suivante (pour la pagination) mais pour les catégories
  */
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
        where("categorie", "==", category),
        orderBy("datePublication", "desc"),
        startAfter(lastVisible),
        limit(18));

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

  /**
* récuperer les articles de la page suivante (pour la pagination) ceux d'un utilisateur spécifique
*/
  getNextPageByUser() {
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
      let id = localStorage.getItem("salakaimmouser")
      // Construct a new query starting at this document,
      // get the next 25 cities.
      const next = query(articleRef,
        where("dealerId", "==", id),
        orderBy("datePublication", "desc"),
        startAfter(lastVisible),
        limit(18));

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


  /**
  * récuperer les articles de la page suivante (pour la pagination) mais pour les catégories
  */
  getNextPageBySearch(queryParams: any) {
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
      const next = queryParams.chambre ? query(articleRef, where("categorie", "==", queryParams.type), where("lieu", "==", queryParams.lieu), where("nombreChambre", "==", queryParams.chambre * 1), orderBy("datePublication", "desc"), startAfter(lastVisible), limit(18)) : query(articleRef, where("categorie", "==", queryParams.type), where("lieu", "==", queryParams.lieu), orderBy("datePublication", "desc"), startAfter(lastVisible), limit(18));
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

  /**
* récuperer les articles similaire a ccelui passé en paramètre
*/
  getArticleSimilaire(article: any) {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const articleRef = collection(db, "articles");
      const q = query(articleRef, where("categorie", "==", article.categorie), where("lieu", "==", article.lieu), where("prix", "<=", article.prix - 20000), where("prix", ">=", article.prix + 20000), limit(6));
      const querySnapshot = await getDocs(q);
      let data: any = []
      if (querySnapshot.docs) {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        resolve(data);
      } else {
        reject("Cette article n'existe pas")
      }
    });
  }






  /**
  * creer un nouvel aticle
  */
  createNewArticle(newArticle: Article) {
    const app = this.firebaseConfigService.app
    const db = getFirestore(app);
    return new Promise((resolve, reject) => {
      setDoc(doc(db, "articles", newArticle.id), {
        ...newArticle, dealerId: getAuth().currentUser?.uid
      }).then(() => {
        resolve("user created successfully")
      }).catch((error) => {
        reject(error);
      })
    });
  }

  /**
* mettre a jour un article aticle
*/
  updateArticle(data: Article, id: string) {
    const app = this.firebaseConfigService.app
    const db = getFirestore(app);
    return new Promise(async (resolve, reject) => {
      const docRef = doc(db, "articles", id);
      await updateDoc(docRef, {
        ...data
      }).then(() => {
        resolve("update successfully")
      }).catch((error) => {
        reject(error);
      })
    });
  }


}
