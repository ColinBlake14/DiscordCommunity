import {Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import {DServerGet, Topic} from "../../shared/interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  topicList: Topic[] = []
  server: DServerGet
  tSub: Subscription
  dSub: Subscription
  sSub: Subscription

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getAllTopics()
    this.sSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.api.getDServerById(params['id'])
      })
    ).subscribe((dServer: DServerGet[]) => {
      this.server = dServer[0]
      console.log('GetDserv: ', dServer[0])
      this.form = new FormGroup({
        title: new FormControl(dServer[0].DServerName, [
          Validators.required,
          Validators.minLength(3)
        ]),
        UI: new FormControl(dServer[0].DServerUI, [
          Validators.required,
          Validators.minLength(15)
        ]),
        game: new FormControl(dServer[0].DServerGame),
        text: new FormControl(dServer[0].DServerText, [
          Validators.required
        ]),
        url: new FormControl(dServer[0].DServerURL, [
          Validators.required,
          Validators.minLength(6)
        ])
      })
    })
  }

  getAllTopics() {
    this.tSub = this.api.getTopicList().subscribe(data => {
      this.topicList = data
    })
  }

  ngOnDestroy(): void {
    if (this.tSub)
      this.tSub.unsubscribe()
    if (this.dSub)
      this.dSub.unsubscribe()
    if (this.sSub)
      this.sSub.unsubscribe()
  }

  submit() {
    if (this.form.invalid)
      return

    this.server.DServerName = this.form.value.title
    this.server.DServerGame = this.form.value.game
    this.server.DServerText = this.form.value.text
    this.server.DServerURL = this.form.value.url
    this.server.DServerDate = new Date().toString()
    this.server.DServerUI = this.form.value.UI

    this.dSub = this.api.updateDServer(this.server).subscribe()
    this.alert.success('Данные о сервере были изменены')
  }
}
