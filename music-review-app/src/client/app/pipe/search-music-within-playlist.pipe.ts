import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchMusicWithinPlaylist'
})
/*
  Pipe Class used for searching the songs within the playlist
*/
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
