import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterService } from 'src/app/services/router.service';
import { Comment } from '../../models/comment.model'
import { v4 as uuidv4 } from 'uuid';
import { EventTypes } from 'src/app/models/event-types';
import { ToastService } from 'src/app/services/toast.service';
import { CommentService } from '../../services/comment.service';
import { Timestamp } from 'firebase/firestore';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  commentForm!: FormGroup;
  loading = false;
  result = true;
  comments: Array<any> = [];
  placeholder = ["", "", "", ""]
  error = {
    title: " Oups... Pas de commentaires !!!",
    errorMessage: " Nous n'avons pas pu récupérer les commentaires.",
    instruction: "Veuillez recharger la page.",
  }
  constructor(public routerService: RouterService,
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private toastService: ToastService) { }

  ngOnInit(): void {
    document.getElementById('head')?.scrollIntoView();
    this.routerService.setRoute("/commentaire");
    this.initForm();
    this.commentService.getComment().then(
      (data: any) => {
        this.comments = data;
        this.loading = false;
      }
    ).catch((error: any) => {
      this.loading = false;
      this.result = false;
    })
  }


  onScroll() {
    console.log("scroll")
    this.loading = true;
    this.commentService.getNextPage().then(
      (data: any) => {
        this.loading = false;
        this.comments.push(...data)
        console.log(this.comments)
      }, (error: any) => {
        this.loading = false;
        console.log(error)
      }
    )
  }

  //initialid=ser le formulaire
  initForm() {
    this.commentForm = this.formBuilder.group({

      message: ['', Validators.required],
      name: ['', Validators.required],
      contact: ['', Validators.required],
      newletter: [''],
    })
  }

  onSaveComment() {
    const message = this.commentForm.get('message')?.value;
    const name = this.commentForm.get('name')?.value;
    const contact = this.commentForm.get('contact')?.value;
    const newletter = this.commentForm.get('newletter')?.value;

    const comment = new Comment();
    comment.name = name;
    comment.contact = contact;
    comment.newletter = newletter;
    comment.message = message;
    comment.datePublication = Timestamp.fromDate(new Date())
    comment.id = uuidv4().replace(/-/g, "")
    console.log(comment)
    this.loading = true;
    this.commentService.createNewComment(comment).then(
      () => {
        this.loading = true;
        this.toastService.showToast(EventTypes.Success, "Success", "Votre commentaire est en ligne :)");
        this.loading = false;
        this.comments.unshift(comment)
      }
    ).catch((error: any) => {
      this.loading = false;
      console.log(error);
      this.toastService.showToast(EventTypes.Error, "Warning", "un problème est survenu :(")
    });


  }

  toDate(date: any) {
    return date.toDate()

  }



}
