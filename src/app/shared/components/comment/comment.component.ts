import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommentGet} from "../../interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../../../admin/shared/services/alert.service";
import {ApiService} from "../../api.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {

  isLike: boolean
  comDate: Date
  dSub: Subscription

  @Input() comment: CommentGet

  constructor(
    private alert: AlertService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    if (this.comment.CommentLike == 1) {
      this.isLike = true
    }
    else {
      !this.isLike
    }
    this.comDate = new Date(this.comment.CommentDate)
  }

  ngOnDestroy(): void {
    if (this.dSub) {
      this.dSub.unsubscribe()
    }
  }

  report() {
    this.comment.CommentStatus ='Reported'
    if (this.isLike) {
      this.comment.CommentLike = 1
    }
    else {
      this.comment.CommentLike = 0
    }
    console.log('Reported: ', this.comment)
    this.dSub = this.api.updateCommentStatus(this.comment).subscribe(() => {
      this.alert.warning('Комментарий был успешно отправлен на проверку содержания')
    })
  }

}
