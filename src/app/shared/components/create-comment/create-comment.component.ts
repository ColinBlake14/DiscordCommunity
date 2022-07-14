import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ApiService} from "../../api.service";
import {AlertService} from "../../../admin/shared/services/alert.service";
import {switchMap} from "rxjs/operators";
import {CommentPost} from "../../interfaces";

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss']
})
export class CreateCommentComponent implements OnInit {

  form: FormGroup
  userName: string | null
  serverId: number

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      comment: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      like: new FormControl(1),
    })
    if (localStorage.getItem('token-name')) {
      this.userName = localStorage.getItem('token-name')
    }
    else {
      this.userName = null
    }
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.serverId = params['id'];
      })).subscribe()
    console.log('ServId: ', this.serverId)
  }


  submit() {
    if (this.form.invalid) {
      return
    }
    else {
      const userComment: CommentPost = {
        CommentText: this.form.value.comment,
        CommentLike: this.form.value.like,
        CommentDate: new Date().toString(),
        CommentUserName: this.userName!,
        CommentServerId: this.serverId,
        CommentStatus: 'Active'
      }
      this.api.postComment(userComment).subscribe()
      this.form.reset()
      this.alert.success('Комментарий был добавлен')
    }
  }
}
