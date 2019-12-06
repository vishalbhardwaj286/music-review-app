import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMusicWithinPlaylist'
})
export class SearchMusicWithinPlaylistPipe implements PipeTransform {

  transform(pipeData,pipeModifier): any {
    return(
      pipeData.filter(eachItem=>{
        return(
          eachItem["title"].toLowerCase().includes(pipeModifier.toLowerCase())
        );
      })
    );
  }


}
