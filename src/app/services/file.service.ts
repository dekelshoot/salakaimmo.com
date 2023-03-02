import { Injectable } from '@angular/core';
import { getStorage, ref, deleteObject, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Article } from '../models/article.model';
import { ArticleService } from './article.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor() { }




  // telecharger l'image et l'uploader dans la base de données
  uploadFile(file: File, doc: string) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const storage = getStorage();
        const upload = ref(storage, doc);
        const imagesRef = ref(storage, doc + '/' + almostUniqueFileName + file.name);
        const uploadTask = uploadBytesResumable(imagesRef, file);

        uploadBytes(imagesRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // Handle unsuccessful uploads
            console.log('Erreur de chargement: ' + error);
            reject();
          },
          () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log('File available at', downloadURL);
              setTimeout(
                () => {
                  resolve(downloadURL);
                }, 3000
              )
            });
          }
        );


      }
    )
  }



  removeFile(article: Article) {
    return new Promise(
      (resolve, reject) => {
        for (let i of article.photo) {
          const storage = getStorage();
          const imageRef = ref(storage, 'images/' + i);
          // Delete the file
          deleteObject(imageRef).then(() => {
            // this.articleService.removearticle(article)
            console.log('photo supprimé')
          }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log('Fichier non trouvé' + error);
          });
        }

      }
    )
  }

}
