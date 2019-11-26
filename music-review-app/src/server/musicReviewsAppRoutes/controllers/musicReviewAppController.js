const Songs = require('./../models/SongsSchema');
const Playlist = require('./../models/PlaylistSchema');

const addNewSong = (req,res) => {

    console.log(req.body.quantity);
    let newSong = new Songs({
        title: req.body.title,
        artist: req.body.artist,
        genre:req.body.genre,
        year:req.body.year,
        reviews:req.body.reviews,
        addedByUser:req.body.addedByUser        
    });
    
    Songs.findOne({"title":req.params.title})
    .then(result=>{
        console.log(result);
        if(result==null) {
            console.log("New Song added.. Saving it to the Database");
            newSong.save().then(result=> {
                console.log(result);
                res.status(200).json({'newSong':result});
            })
            .catch(error=>{
                res.status(500).json({'message':error});
            })
        }
        else {
            let song_id = result._id;
            console.log(`Need to update the song with id ${song_id}`);
            Songs.updateOne({_id: song_id}, {$set: {title: req.body.title,artist:req.body.artist,genre:req.body.genre,year:req.body.year,reviews:req.body.reviews}})
            .then(result=>{
                res.status(200).json({'message':'Song attributes updated','song':result});
            })
            .catch(error=>{
                res.status(500).json({"message":`Encountered error while updating ${song_id}`});
            })
            
        }
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            "message":`Unable to fetch song_id ${song_id}`
        });
    });
    

};

const createNewPlaylist = (req,res) => {

    console.log(`Creating new playlist for user ${req.body.createdByUser} having title ${req.body.playlistTitle} with songs ${req.body.songsInPlaylist}`);
    let newPlaylist = new Playlist({
        playlistTitle: req.body.playlistTitle,
        playlistDescription:req.body.playlistDescription,
        songsInPlaylist:req.body.songsInPlaylist,
        createdByUser:req.body.createdByUser,

    });
    
    Playlist.findOne({"playlistTitle":req.params.playlistTitle})
    .then(result=>{
        console.log(result);
        if(result==null) {
            console.log("Saving New Playlist to the Database");
            newPlaylist.save().then(result=> {
                console.log(result);
                res.status(200).json({'newPlaylist':result});
            })
            .catch(error=>{
                res.status(500).json({'message':error});
            })
        }
        else {
            let playlist_id = result._id;
            console.log(`Need to update the song with id ${playlist_id}`);
            Songs.updateOne(
                {_id: playlist_id}, 
                {$set: {
                    playlistTitle: req.body.playlistTitle,
                    playlistDescription:req.body.playlistDescription,
                    genre:req.body.genre,
                    year:req.body.year,
                    reviews:req.body.reviews}
                })
            .then(result=>{
                res.status(200).json({'message':'Playlist attributes updated','playlist':result});
            })
            .catch(error=>{
                res.status(500).json({"message":`Encountered error while updating ${playlist_id}`});
            })
            
        }
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            "message":`Unable to fetch playlist_id ${playlist_id}`
        });
    });
    
};

module.exports = {addNewSong,createNewPlaylist};