import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import {Genre, Topic, TopicGenre, TopicGenrePost, NamedGenre} from "../../shared/interfaces";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AlertService } from "../shared/services/alert.service";

interface UploadImageParams {
  event: any
}

@Component({
  selector: 'app-edit-topic-page',
  templateUrl: './edit-topic-page.component.html',
  styleUrls: ['./edit-topic-page.component.scss']
})
export class EditTopicPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  topic: Topic
  uSub: Subscription
  iSub: Subscription
  tSub: Subscription
  PhotoFileName:string
  PhotoFilePath:string
  genreList: Genre[]
  topicGenreList: TopicGenre[]
  namedGenreList: NamedGenre[] = []

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getGenreList()
    this.tSub = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.api.getTopicById(params['id'])
      })
    ).subscribe((topic: Topic[]) => {
      this.topic = topic[0]
      console.log('GetTopicResult: ', topic[0])
      this.PhotoFileName = topic[0].TopicImage
      this.PhotoFilePath = this.api.ImageUrl + this.PhotoFileName;
      this.form = new FormGroup({
        name: new FormControl(topic[0].TopicName, [
          Validators.required,
          Validators.minLength(3)
        ]),
        genre: new FormControl('')
      })
      this.getTopicGenreList()
    })
  }

  async getGenreList() {
    this.api.getGenreList()
      .subscribe( data => {
      this.genreList = data
        console.log('GenreList: ', this.genreList)
    })
  }

  ngOnDestroy(): void {
    if (this.uSub)
      this.uSub.unsubscribe()
    if (this.iSub)
      this.iSub.unsubscribe()
    if (this.tSub)
      this.tSub.unsubscribe()
  }

  uploadImage({event}: UploadImageParams) {
    let file = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('uploadedFile',file,file.name);

    this.iSub = this.api.UploadImage(formData).subscribe((data:any) => {
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.api.ImageUrl+this.PhotoFileName;
    })
  }

  getTopicGenreList() {
    const tgToGetList: TopicGenrePost = {
      TopicId: this.topic.TopicId,
      GenreId: 1
    }
    this.api.getTopicGenreByTopic(tgToGetList)
      .subscribe(data => {
        this.topicGenreList = data
        console.log('topicGenreList', this.topicGenreList)
        for (let list of this.topicGenreList) {
          this.api.getGenreById(list.GenreId)
            .subscribe(data => {
              let item: NamedGenre = {
                tgId: list.TopicGenreId,
                genreName: data[0].GenreName
              }
              this.namedGenreList.push(item)
            })
        }
        console.log('NamedGenreList: ', this.namedGenreList)
      })
  }

  addGenre(event: Event) {
    event.preventDefault()
    const tgPost: TopicGenrePost = {
      TopicId: this.topic.TopicId,
      GenreId: this.form.value.genre
    }
    console.log('tg to Post: ', tgPost)
    this.api.postTopicGenre(tgPost).subscribe()
    this.alert.success('Жанр успешно добавлен')
    document.location.reload()
  }

  delete(tgId: number) {
    this.api.deleteTopicGenre(tgId).subscribe()
    this.alert.success('Жанр успешно удален')
  }

  submit() {
    if (this.form.invalid)
      return

    this.topic.TopicName = this.form.value.name
    this.topic.TopicImage = this.PhotoFileName

    this.uSub = this.api.updateTopic(this.topic).subscribe()
    this.alert.success('Данные категории были изменены')
  }

}
