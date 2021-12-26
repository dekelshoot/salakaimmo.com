import { Injectable, Component } from '@angular/core';
import { getDatabase, ref, set, onValue ,} from "firebase/database";

import { Subject } from 'rxjs';
import { Article} from 'src/app/models/article.model';
import { Router } from '@angular/router';
import { Comment } from '../models/comment.model';
 

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  comments: Comment[]=[];
  start = false;
  commentSubject= new Subject<Comment[]>();
  startSubject= new Subject<boolean>();

  constructor() { }

  
//emetre les les subjects pour permetre leur utilisation 
emitArticle(){
  this.commentSubject.next(this.comments);
}

emitStart(){
  this.startSubject.next(this.start);
}

 //sauvegarder les articles dans la base de donnée
 saveComment(){
  const db = getDatabase();
  set(ref(db, 'comments/'), this.comments);
}

 //recuperer les articles de la base de donnéee
 getComment(){
  const db = getDatabase();
  const commentRef = ref(db, '/comments');
  return new Promise(
    (resolve, reject)=>{
      onValue(commentRef, (snapshot) => {
        resolve(snapshot.val());
        const data = snapshot.val();
        this.comments = data;
        this.emitArticle();
        },(error:any)=>{
        reject(error)
        }
      );
    }
  )

}

  //cree un article
  createNewComment(newComment: Comment){
    this.comments.unshift(newComment);
    this.saveComment();
    this.emitArticle();
  }


}
