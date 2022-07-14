import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import {DServer, TopicPost} from "../../shared/interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AlertService } from "../shared/services/alert.service";

interface UploadImageParams {
  event: any;
}

@Component({
  selector: 'app-create-topic-page',
  templateUrl: './create-topic-page.component.html',
  styleUrls: ['./create-topic-page.component.scss']
})
export class CreateTopicPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  tSub: Subscription
  iSub: Subscription
  PhotoFileName:string;
  PhotoFilePath:string;

  constructor(
    private api: ApiService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.PhotoFilePath = this.api.ImageUrl+'anonymous.PNG';
      this.form = new FormGroup({
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(3)
        ]),
        image: new FormControl('', [
          Validators.required
        ])
      })
  }

  ngOnDestroy(): void {
    if (this.tSub)
      this.tSub.unsubscribe()
    if (this.iSub)
      this.iSub.unsubscribe()
  }

  uploadImage({event}: UploadImageParams) {
    let file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile',file,file.name);

    this.api.UploadImage(formData).subscribe((data:any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.api.ImageUrl+this.PhotoFileName;
    })
  }

  submit() {
    if (this.form.invalid)
      return

    const topic: TopicPost = {
      TopicName: this.form.value.name,
      TopicImage: this.PhotoFileName
    }

    console.log('Top to post: ', topic)

    this.tSub = this.api.postTopic(topic).subscribe()
    this.alert.success('Категория была добавлена')
  }
}
