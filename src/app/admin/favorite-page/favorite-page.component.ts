import { Component, OnInit } from '@angular/core';
import {DServerGetToForm, FavoriteGet, FavoriteUserName} from "../../shared/interfaces";
import {ApiService} from "../../shared/api.service";

@Component({
  selector: 'app-favorite-page',
  templateUrl: './favorite-page.component.html',
  styleUrls: ['./favorite-page.component.scss']
})
export class FavoritePageComponent implements OnInit {

  serverIdList: FavoriteGet[] = []
  serverNamedList: DServerGetToForm[] = []
  server: DServerGetToForm[] = []

  constructor(
    private api: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getServerIdList()
    console.log('ServerIdList: ', this.serverIdList)
    for (let list of this.serverIdList) {
      this.server = await this.api.getDServerByIdToForm(list.FavoriteServerId).toPromise()
      this.serverNamedList.push(this.server[0])
    }
    console.log('ServerNamedList: ', this.serverNamedList)
  }

  async getServerIdList() {
    const userName: FavoriteUserName = {
      FavoriteUserName: localStorage.getItem('token-name')!
    }
    this.serverIdList = await this.api.getFavoriteByUser(userName).toPromise()
  }

}
