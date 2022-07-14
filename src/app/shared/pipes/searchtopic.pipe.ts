import {Pipe, PipeTransform} from "@angular/core";
import {Topic} from "../interfaces";

@Pipe({
  name: 'searchTopics'
})

export class SearchtopicPipe implements PipeTransform {
  transform(topics: Topic[], search = ''): Topic[] {
    if (!search.trim()) {
      return topics
    }

    return topics.filter(topic => {
      return topic.TopicName.toLowerCase().includes(search.toLowerCase())
    })
  }

}
