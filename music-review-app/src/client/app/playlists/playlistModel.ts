export interface PlaylistModel{
    playlistID?:string
    playlistTitle?:string,
    playlistDescription?:string,
    songsInPlaylist:any,
    createdByUser:string,
    playListVisibilityScope?:string
    created_date?: Date;
}