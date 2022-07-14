import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import {DServerGetToForm, DServerUpdStatus} from "../../shared/interfaces";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertService } from "../shared/services/alert.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  dServersData: DServerGetToForm[] = []
  dSub: Subscription
  ddSub: Subscription
  searchStr = ''

  constructor(
    private api: ApiService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getAllDServers()
  }

  getAllDServers() {
    this.dSub = this.api.getDServersList().subscribe(data => {
      this.dServersData = data
      console.log("ServersData: ", this.dServersData)
    })
  }

  remove(id: number) {
    const dServerToUpdateStatus: DServerUpdStatus = {
      DServerId: id,
      DServerStatus: 'Deleted'
    }
    console.log('Check ', dServerToUpdateStatus)
    this.ddSub = this.api.updateDServerStatusData(dServerToUpdateStatus)
      .subscribe(() => {
        this.dServersData = this.dServersData.filter( serv => serv.DServerId != id)
        this.alert.danger('Сервер был удален')
      })
  }

  toDisc(id: number) {
    this.router.navigate(['/admin','disc', id, 'edit'])
  }

  sort() {
    this.dServersData.sort((a, b) => a.DServerStatus == 'Deleted' ? -1 : 1)
    this.dServersData.sort((a, b) => a.DServerStatus == 'Reported' ? -1 : 1)
  }

  reestablish(id: number) {
    const dServerUpdSt: DServerUpdStatus = {
      DServerId: id,
      DServerStatus: 'Active'
    }
    this.api.updateDServerStatusData(dServerUpdSt).subscribe(() => {
      this.alert.success('Северер успешно восстановлен')
    })
  }

  ngOnDestroy(): void {
    if (this.dSub) {
      this.dSub.unsubscribe()
    }

    if (this.ddSub) {
      this.ddSub.unsubscribe()
    }
  }
}
