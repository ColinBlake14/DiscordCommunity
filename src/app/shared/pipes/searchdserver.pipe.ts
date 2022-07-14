import { Pipe, PipeTransform } from "@angular/core";
import {DServerGetToForm, DServerGetToFormFull} from "../interfaces";

@Pipe({
  name: 'searchDServers'
})

export class SearchdserverPipe implements PipeTransform {
  transform(servers: DServerGetToFormFull[], search = ''): DServerGetToFormFull[] {
    if (!search.trim()) {
      return servers
    }

    return servers.filter(server => {
      return server.DServerName.toLowerCase().includes(search.toLowerCase())
    })
  }

}
