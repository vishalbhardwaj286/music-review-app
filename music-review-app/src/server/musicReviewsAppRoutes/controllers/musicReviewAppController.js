const Songs = require('./../models/SongsSchema');
const Playlist = require('./../models/PlaylistSchema');
const SongsReviewsSchema = require('../models/SongReviewSchema');

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

const fetchAllPublicPlaylists = (req,res) => {

    console.log(`Fetching all public playlists`);
    Playlist.find()
    .lean()
    .select('id playlistTitle playlistDescription songsInPlaylist createdByUser created_date')
    .populate('songsInPlaylist.songs')
    
    .then(playlists=>{
        if(playlists==null){
            res.status(200).send({"message":`There isn't any playlist to show currently`});
        }
        else {
            console.log('Playlists fetched successully');
            res.status(200).json({
                count:playlists.length,
                playlists:playlists,

            });
            
        }
    })
    .catch(error=>{
        console.log(`Got an error while Fetching all public playlists ${error}`)
        res.status(500).send({"message":`Technical Error Occured! Please contact the system administrator !`});
    })

    
};

const saveUserReviewsForGivenSong = (req,res) => {

    console.log(`Saving user reviews for song ${req.body.reviewedSongID}`);
    
    let review = new SongsReviewsSchema({
        
        reviewedSongID: req.body.reviewedSongID,
        ratingsGivenByUser:req.body.ratingsGivenByUser
    });
    console.log(`Checking if the song ${req.body.reviewedSongID} is reviewed earlier by any user`);
    SongsReviewsSchema.findOne({"reviewedSongID":req.body.reviewedSongID})
    .then(result=>{
        console.log(`Result is ${result}`);
        if(result==null) {
            console.log("Saving Initial review of the song");
            review.save().then(result=> {
                console.log(result);
                res.status(200).json({'reviews':result});
            })
            .catch(error=>{
                console.log(`Error while saving review for a given song ${req.params.reviewedSongID}`);
                res.status(500).json({'message':error});
            })
        }
        else {
            let review_song_id = result.reviewedSongID;
            console.log(`Updating reviews having of song ${review_song_id}`);
            SongsReviewsSchema.update(
                { _id: result._id }, 
                { $push: { ratingsGivenByUser: 
                    req.body.ratingsGivenByUser
                 } }
                
            )
            // SongsReviewsSchema.update(
            //     {reviewedSongTitle: review_id}, 
            //     {$push: {
            //         reviewedSongID: req.body.reviewedSongID,
            //         ratingsGivenByUser:req.body.ratingsGivenByUser,
            //         commentsGivenByUser:req.body.commentsGivenByUser,
            //         ratedByUser:req.body.ratedByUser
            //         }
                    
            //     })
            
            .then(result=>{
                res.status(200).json({'message':'Another review added','reviews':result});
            })
            .catch(error=>{
                res.status(500).json({"message":`Encountered error while adding another review ${review_id}`});
            })
            
        }
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            "message":`Unable to fetch review_id ${review_id}`
        });
    });
    
};


module.exports = {addNewSong,createNewPlaylist,fetchAllPublicPlaylists,saveUserReviewsForGivenSong};