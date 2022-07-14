import { Component, OnInit } from '@angular/core';
import {CommentGet, CommentStatus, CommentToRes} from "../../shared/interfaces";
import {ApiService} from "../../shared/api.service";
import {Router} from "@angular/router";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-reportedcomments-page',
  templateUrl: './reportedcomments-page.component.html',
  styleUrls: ['./reportedcomments-page.component.scss']
})
export class ReportedcommentsPageComponent implements OnInit {

  comStatus: CommentStatus = {
    CommentStatus : 'Reported'
  }
  commentsData: CommentGet[] = []

  constructor(
    private api: ApiService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getAllReportedComments()
  }

  getAllReportedComments() {
    this.api.getReportedComments(this.comStatus).subscribe(data => {
      this.commentsData = data
      console.log("CommentsData: ", this.commentsData)
    })
  }

  reestablish(id: number) {
    const commentToUpdate: CommentToRes = {
      CommentId: id,
      CommentStatus: 'Active'
    }
    this.api.updateCommentStatusRes(commentToUpdate).subscribe(() => {
      this.alert.success('Комментарий был успешно восстановлен')
    })
  }

  delete(id: number) {
    this.api.deleteComment(id).subscribe( () => {
      this.alert.warning('Комментарий был успешно удален')
    })
  }
}
