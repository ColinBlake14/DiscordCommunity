import { Component, Input, OnInit } from '@angular/core';
import {
  DServerGetToForm, FavoritePost,
  NamedGenre,
  TopicGenre,
  TopicGenrePost,
  TopicId,
  TopicName
} from "../../interfaces";
import { ApiService } from "../../api.service";


@Component({
  selector: 'app-disc',
  templateUrl: './disc.component.html',
  styleUrls: ['./disc.component.scss']
})
export class DiscComponent implements OnInit {

  @Input() server: DServerGetToForm

  imageFilePath: string = this.api.ImageUrl + 'anonymous.PNG'
  serverImage: string
  topicName: TopicName = {
    TopicName: ''
  }
  topicId: TopicId = {
    TopicId: 0
  }
  topicGenreList: TopicGenre[]
  namedGenreList: NamedGenre[] = []
  favorCount: number = 0

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getServerImage(this.server.DServerId)
    this.getTopicGenreList()
    if (this.server.DServerOnline == null) {
      this.server.DServerOnline = 'No data'
    }

    const favoriteCountCheck: FavoritePost = {
      FavoriteUserName: 'User',
      FavoriteServerId: this.server.DServerId
    }
    this.api.getFavoriteCount(favoriteCountCheck)
      .subscribe( data => {
        this.favorCount = data
      })
  }

  getTopicGenreList() {
    this.topicName.TopicName = this.server.DServerGame
    this.api.getTopicIdByName(this.topicName)
      .subscribe( data => {
        this.topicId.TopicId = data[0].TopicId
        const tgToGetList: TopicGenrePost = {
          TopicId: this.topicId.TopicId,
          GenreId: 1
        }
        this.api.getTopicGenreByTopic(tgToGetList)
          .subscribe(data => {
            this.topicGenreList = data
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
          })
      })
  }

  getServerImage(id: number) {
    return this.api.getServerImage(id).subscribe(res => {
      this.serverImage = res[0].TopicImage
      this.imageFilePath = this.api.ImageUrl + this.serverImage
    })
  }
}
