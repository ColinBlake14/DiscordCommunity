import { Pipe, PipeTransform } from "@angular/core";
import {DServerGet, DServerGetToForm} from "../interfaces";

@Pipe({
  name: 'searchServers'
})

export class SearchPipe implements PipeTransform {
  transform(servers: DServerGetToForm[], search = ''): DServerGetToForm[] {
    if (!search.trim()) {
      return servers
    }

    return servers.filter(server => {
      return server.DServerName.toLowerCase().includes(search.toLowerCase())
    })
  }

}
