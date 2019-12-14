export interface SongsModel{
    title:string,
    artist:string,
    album:string,
    genre:string,
    year:Date,
    reviews:string,
    songVisibility?:boolean
    addedByUser:string,
    created_date?: Date;
}