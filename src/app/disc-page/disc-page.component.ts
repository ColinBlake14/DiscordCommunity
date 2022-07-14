import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { ApiService } from "../shared/api.service";
import {
  CommentGet,
  CommentToSearch,
  DServerGetToForm,
  DServerOnline,
  DServerUpdOnline,
  DServerUpdStatus, FavoriteGet, FavoritePost, NamedGenre, TopicGenre, TopicGenrePost, TopicId, TopicName
} from "../shared/interfaces";
import { switchMap } from "rxjs/operators";
import {AlertService} from "../admin/shared/services/alert.service";

@Component({
  selector: 'app-disc-page',
  templateUrl: './disc-page.component.html',
  styleUrls: ['./disc-page.component.scss']
})
export class DiscPageComponent implements OnInit {

  server: DServerGetToForm
  serverId: number
  serverST: DServerGetToForm[]
  servStat: DServerOnline
  imageFilePath: string = this.api.ImageUrl + 'anonymous.PNG'
  serverImage: string
  dComments: CommentGet[]
  userName: string | null
  favorCheck: FavoriteGet[]
  isFavor: boolean
  favorCount: number
  topicName: TopicName = {
    TopicName: ''
  }
  topicId: TopicId = {
    TopicId: 0
  }
  topicGenreList: TopicGenre[]
  namedGenreList: NamedGenre[] = []

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private alert: AlertService
  ) { }

  async ngOnInit(): Promise<void> {
    this.route.params
      .pipe(switchMap((params: Params) => {
        this.getServerImage(params['id'])
        this.serverId = params['id']
        this.getServerData(params['id'])
          .then(response => {
            this.getServerOnline(response)
          })

        return this.api.getDServerByIdToForm(params['id'])
      })).subscribe((server: DServerGetToForm[]) => {
      this.server = server[0]
    })
    const commentToSrch: CommentToSearch = {
      CommentServerId: this.serverId,
      CommentStatus: 'Active'
    }
    this.dComments = await this.getCommentsData(commentToSrch)
    console.log('CommentsCheck: ', this.dComments)

    if (localStorage.getItem('token-name')) {
      this.userName = localStorage.getItem('token-name')

      const favoriteCheck: FavoritePost = {
        FavoriteUserName: this.userName!,
        FavoriteServerId: this.serverId
      }
      this.favorCheck = await this.api.getFavoriteByUserServer(favoriteCheck).toPromise()
      this.isFavor = !!this.favorCheck[0].FavoriteId;
      console.log('FavCheck: ', this.isFavor)
    }
    else {
      this.userName = null
    }

    const favoriteCountCheck: FavoritePost = {
      FavoriteUserName: 'User',
      FavoriteServerId: this.serverId
    }
    this.favorCount = await this.api.getFavoriteCount(favoriteCountCheck).toPromise()
    console.log('FavorCount: ', this.favorCount)
    this.getTopicGenreList()
  }

  async getServerData (id: number) {
    this.serverST = await this.api.getDServerByIdToForm(id).toPromise()
    console.log('ServerST: ', this.serverST)
    return this.serverST[0].DServerUI
  }

  getServerOnline (UI:string) {
    if (this.serverST[0].DServerStatus == 'Active') {
      const nowDate = new Date()
      if (!this.serverST[0].DServerUPD) {
        this.api.getDServerOnline(UI)
          .subscribe(response => {
            this.servStat = response
            console.log('ServerOnline:', this.servStat.presence_count.toString())
            const servDataToUpdate: DServerUpdOnline = {
              DServerUI: UI,
              DServerUPD: nowDate.toString(),
              DServerOnline: this.servStat.presence_count.toString()
            }
            this.api.updateDServerOnlineData(servDataToUpdate)
              .subscribe(res => {
                console.log(res)
              })
          })
      }
    }
  }

  async getCommentsData (data: CommentToSearch) {
    return this.dComments = await this.api.getCommentsByDServer(data).toPromise()
  }

  getTopicGenreList() {
    this.topicName.TopicName = this.serverST[0].DServerGame
    console.log('Server Game/Topic Name', this.topicName)
    this.api.getTopicIdByName(this.topicName)
      .subscribe( data => {
        this.topicId.TopicId = data[0].TopicId
        console.log('Topic Id', this.topicId)

        const tgToGetList: TopicGenrePost = {
          TopicId: this.topicId.TopicId,
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
      })
  }

  report(id: number) {
    const dServerToUpdateStatus: DServerUpdStatus = {
      DServerId: id,
      DServerStatus: 'Reported'
    }
    this.api.updateDServerStatusData(dServerToUpdateStatus)
      .subscribe(() => {
        this.alert.warning('Сервер был отправлен на проверку')
      })
  }

  toFavorite(id: number) {
    const favoriteToPost: FavoritePost = {
      FavoriteUserName: this.userName!,
      FavoriteServerId: id
    }
    if (this.userName) {
      this.api.postFavorite(favoriteToPost)
        .subscribe(() => {
          this.alert.success('Сервер был добавлен в избранное')
        })
    }
  }

  deliteFavorite() {
    this.api.deleteFavorite(this.favorCheck[0].FavoriteId).subscribe(
      response => {
        console.log(response)
        this.alert.success('Сервер удален из избранного')
      }
    )
  }

  getServerImage(id: number) {
    return this.api.getServerImage(id).subscribe(res => {
      this.serverImage = res[0].TopicImage
      this.imageFilePath = this.api.ImageUrl + this.serverImage
    })
  }

}
