import { Injectable } from '@angular/core';
import { getDocs, doc, getDoc, getFirestore, query, collection, setDoc, updateDoc } from 'firebase/firestore';
import { getDatabase, ref, onValue } from "firebase/database";
import { Dealer } from '../models/dealer.model';
import { FirebaseConfigService } from './firebase-config.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  dealers: Dealer[] = [];
  dealer!: any;
  app: any;
  constructor(private firebaseConfigService: FirebaseConfigService) { }



  getDealer() {
    const db = getDatabase();
    const dealerRef = ref(db, '/dealer')
    return new Promise(
      (resolve, reject) => {

        onValue(dealerRef, (snapshot) => {
          resolve(snapshot.val());
          const data = snapshot.val();
          this.dealers = data;
        }, (error: any) => {
          reject(error)
        }
        );
      }
    )
  }

  getSingleDealer(id: string | any) {
    return new Promise(async (resolve, reject) => {
      const db = getFirestore(this.app);
      const docRef = doc(db, "dealers", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.dealer = docSnap.data();
        resolve(docSnap.data());
      } else {
        reject("le vendeur n'existe pas")
      }
    });
  }

  getAllDealers() {
    return new Promise(async (resolve, reject) => {
      const app = this.firebaseConfigService.app
      const db = getFirestore(app);
      const dealerRef = collection(db, "dealers");
      const q = query(dealerRef)
      const querySnapshot = await getDocs(q);
      let data: any = []
      if (querySnapshot.docs) {
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
          console.log(data)
        });
        resolve(data);
      } else {
        reject("Cette article n'existe pas")
      }
    });
  }

  /**
* mettre a jour un profil
*/
  updateProfile(data: User, id: string) {
    const app = this.firebaseConfigService.app
    const db = getFirestore(app);
    return new Promise(async (resolve, reject) => {
      const docRef = doc(db, "dealers", id);
      await updateDoc(docRef, {
        ...data
      }).then(() => {
        resolve("update successfully")
      }).catch((error) => {
        reject(error);
      })
    });
  }

  /**
* mettre a jour la photo de profil
*/
  updateProfilePicture(data: any, id: string) {
    const app = this.firebaseConfigService.app
    const db = getFirestore(app);
    return new Promise(async (resolve, reject) => {
      const docRef = doc(db, "dealers", id);
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
