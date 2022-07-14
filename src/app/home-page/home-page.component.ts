import {Component, OnInit} from '@angular/core';
import {
  DServerGetToForm,
  DServerGetToFormFull, Genre,
  NamedGenreServer, TopicGenre,
  TopicGenrePost,
  TopicId,
  TopicName
} from "../shared/interfaces";
import { ApiService } from "../shared/api.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styles: [
  ]
})
export class HomePageComponent implements OnInit {

  dServers: DServerGetToForm[]
  dServersFull: DServerGetToFormFull[] = []
  genresData: Genre[] = []
  arrLeng: number = 0

  topicName: TopicName = {
    TopicName: ''
  }
  topicId: TopicId = {
    TopicId: 0
  }
  topicGenreList: TopicGenre[]
  namedGenreList: NamedGenreServer[] = []
  topicIdByName: TopicId[] = []
  genreById: Genre[] = []

  searchStr = ''
  searchStr2 = ''
  searchStr3 = ''

  constructor(
    private api: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.getAllGenres()
    await this.formDServers()

    console.log('NamedGenreList: ', this.namedGenreList)
    console.log('Length: ', this.namedGenreList.length)

    for (let i = 0; i < this.dServers.length; i++) {
      let server = this.dServers[i];
      this.dServersFull.push(<DServerGetToFormFull>server)
      this.dServersFull[i].DServerGenres = []
      if (this.dServersFull[i].DServerOnline == null) {
        this.dServersFull[i].DServerOnline = 'No data'
      }

      for (let j = 0; j < this.namedGenreList.length; j++) {
        let data = this.namedGenreList[j]
        if (data.dserverId == server.DServerId) {
          this.dServersFull[i].DServerGenres.push(data.genreName)
          console.log('Item pushed: ', data.genreName)
        }
      }
    }

    console.log('DserverFull', this.dServersFull)
  }

  async formDServers(): Promise<void> {
    this.dServers = await this.api.getDServersList().toPromise()
    for (let i = 0; i < this.dServers.length; i++){
      let server = this.dServers[i];

      this.topicName.TopicName = server.DServerGame

      this.topicIdByName = await this.api.getTopicIdByName(this.topicName).toPromise()
      this.topicId.TopicId = this.topicIdByName[0].TopicId
      const tgToGetList: TopicGenrePost = {
        TopicId: this.topicId.TopicId,
        GenreId: 1
      }

      this.topicGenreList = await this.api.getTopicGenreByTopic(tgToGetList).toPromise()

      for (let list of this.topicGenreList) {
        this.genreById = await this.api.getGenreById(list.GenreId).toPromise()

        let item: NamedGenreServer = {
          dserverId: server.DServerId,
          tgId: list.TopicGenreId,
          genreName: this.genreById[0].GenreName
        }

        this.arrLeng = this.namedGenreList.push(item)
        console.log('LengthNow: ', this.arrLeng)
      }
    }
  }

  getAllGenres() {
    this.api.getGenreList().subscribe(data => {
      this.genresData = data
      console.log("GenresData: ", this.genresData)
    })
  }

  srchGen(GenreName: string) {
    this.searchStr3 = GenreName
  }

  sortDServersByOnline() {
    this.dServersFull.sort((a, b) => Number(a.DServerOnline) > Number(b.DServerOnline) ? -1 : 1)
  }

  sortDServersByLikes() {

  }
}
