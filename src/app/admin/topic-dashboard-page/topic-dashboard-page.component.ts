import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from "../../shared/api.service";
import { Topic} from "../../shared/interfaces";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertService } from "../shared/services/alert.service";

@Component({
  selector: 'app-topic-dashboard-page',
  templateUrl: './topic-dashboard-page.component.html',
  styleUrls: ['./topic-dashboard-page.component.scss']
})
export class TopicDashboardPageComponent implements OnInit, OnDestroy {

  topicsData: Topic[] = []
  tSub: Subscription
  ttSub: Subscription
  searchStr = ''

  constructor(
    private api: ApiService,
    private router: Router,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getAllTopics()
  }

  getAllTopics() {
    this.tSub = this.api.getTopicList().subscribe(data => {
      this.topicsData = data
      console.log("TopicsData: ", this.topicsData)
    })
  }

  remove(id: number) {
    this.ttSub = this.api.deleteTopic(id).subscribe(() => {
      this.topicsData = this.topicsData.filter( top => top.TopicId != id)
      this.alert.danger('Категория была удалена')
    })
  }

  toTopic(id: number) {
    this.router.navigate(['/admin','topic', id, 'edit'])
  }

  ngOnDestroy(): void {
    if (this.tSub) {
      this.tSub.unsubscribe()
    }

    if (this.ttSub) {
      this.ttSub.unsubscribe()
    }
  }
}
