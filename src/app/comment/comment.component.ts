import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Comment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-coment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class ComentComponent implements OnInit {
  commentForm!: FormGroup;
  comments: Comment[]=[]
  commentSubscription! : Subscription;
  startSubject!: Subscription;
  loading=false;
    constructor(private router: Router,
                private formBuilder: FormBuilder,
                private commentService:CommentService,
                private articleService:ArticleService) { }


  ngOnInit(): void {
    document.getElementById("head")?.scrollIntoView();
    this.commentSubscription = this.commentService.commentSubject.subscribe(
      ( comments: Comment[]) =>{
        this.comments = comments;
      }
    );
    this.initForm()
    this.commentService.getComment()
    this.commentService.emitArticle()
  }

  
  //initialid=ser le formulaire
  initForm(){
    this.commentForm = this.formBuilder.group({ 
      name:['', Validators.required],
      contact:['', Validators.required],
      comment:['', Validators.required],
    })
  }


  onBack(){
    this.router.navigate( ['/accueil']);
  
  }

  onComent(){
    this.articleService.start=true;
    this.articleService.emitStart()
    this.articleService.emitStart()
    const name = this.commentForm.get('name')?.value;
    const contact = this.commentForm.get('contact')?.value;
    const comment = this.commentForm.get('comment')?.value;
    let commentObject={
      id:0,
      author: name,
      contact: contact,
      comment: comment,
      like:0
    }
    console.log(commentObject)
    this.commentService.createNewComment(commentObject)
    setTimeout(
      () => {
        this.articleService.start=false;
        this.articleService.emitStart()
        document.getElementById("comment")?.scrollIntoView();
    },1000 );
  }
like(i:number){
  this.comments[i].like=this.comments[i].like+1
  this.commentService.comments=this.comments
  this.commentService.saveComment();
}
}
