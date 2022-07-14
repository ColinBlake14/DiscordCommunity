import { Pipe, PipeTransform } from "@angular/core";
import {DServerGetToForm, DServerGetToFormFull} from "../interfaces";

@Pipe({
  name: 'searchGenre'
})

export class SearchgenrePipe implements PipeTransform {
  transform(servers: DServerGetToFormFull[], search = ''): DServerGetToFormFull[] {
    if (!search.trim()) {
      return servers
    }

    return servers.filter(server => {
      return server.DServerGenres.includes(search)
    })
  }

}
