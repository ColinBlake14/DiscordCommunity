import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";
import { ApiService } from "../../shared/api.service";
import { DServer, Topic } from "../../shared/interfaces";
import { AlertService } from "../shared/services/alert.service";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup
  topicList: Topic[] = []

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private api: ApiService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      UI: new FormControl('', [
        Validators.required,
        Validators.minLength(15)
      ]),
      game: new FormControl(''),
      text: new FormControl('', [
        Validators.required
      ]),
      url: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ])
    })
    this.getAllTopics()
  }

  getAllTopics() {
    this.api.getTopicList().subscribe(data => {
      this.topicList = data
      console.log('Topics: ', this.topicList)
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    if (this.auth.isAuthenticated()) {
      const server: DServer = {
        DServerName: this.form.value.title,
        DServerGame: this.form.value.game,
        DServerText: this.form.value.text,
        DServerURL: this.form.value.url,
        DServerAuthor: localStorage.getItem('token-name')!,
        DServerDate: new Date().toString(),
        DServerUI: this.form.value.UI,
        DServerStatus: 'Active'
      }
      console.log('PostServer: ', server)
      this.api.postDServer(server).subscribe()
      this.form.reset()
      this.alert.success('Пост был создан')
    }
    else {
      this.auth.logout()
      this.form.reset()
    }
  }
}
