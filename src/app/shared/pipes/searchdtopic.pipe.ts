import { Pipe, PipeTransform } from "@angular/core";
import {DServerGet, DServerGetToForm, DServerGetToFormFull} from "../interfaces";

@Pipe({
  name: 'searchDTopics'
})

export class SearchdtopicPipe implements PipeTransform {
  transform(servers: DServerGetToFormFull[], search = ''): DServerGetToFormFull[] {
    if (!search.trim()) {
      return servers
    }

    return servers.filter(server => {
      return server.DServerGame.toLowerCase().includes(search.toLowerCase())
    })
  }

}
