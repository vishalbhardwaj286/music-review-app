const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');



const PlaylistSchema = mongoose.Schema({
   playlistTitle : {
        type: String,
        required: 'Playlist title required',
        lowercase:true,
        min:3,
        unique:true
   },
   playlistDescription :{
        type : String
   },
   songsInPlaylist: [{
        songs:{
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Songs',
          required: 'Dummy Playlist creation not allowed !'
        }
     }],
    playListVisibilityScope: {
        type:String,
        default:'Private'
    },
   createdByUser : {
        type: String,
        lowercase:true,
        required: 'Playlist owner required entity'
   },
    created_date:{
    type: Date,
    default: Date.now
   }

});
PlaylistSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Playlists',PlaylistSchema,'Playlists');