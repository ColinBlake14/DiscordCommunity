import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {DServerGetToForm} from "../../shared/interfaces";

@Component({
  selector: 'app-recomendation-page',
  templateUrl: './recomendation-page.component.html',
  styleUrls: ['./recomendation-page.component.scss']
})
export class RecomendationPageComponent implements OnInit {

  dServers: DServerGetToForm[]

  constructor(
    private api: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.dServers = await this.api.getDServersList().toPromise()
    this.dServers.sort((a, b) => Number(a.DServerOnline) < Number(b.DServerOnline) ? -1 : 1)
    this.dServers.length = 3
    console.log('Servers: ', this.dServers)
  }

}
