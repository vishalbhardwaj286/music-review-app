const Songs = require('./../models/SongsSchema');

const Playlist = require('./../models/PlaylistSchema');
const SongsReviewsSchema = require('../models/SongReviewSchema');
const users = require('../models/users');

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
        createdByUser:req.body.createdByUser
    });
    
    Playlist.findOne({"playlistTitle":req.body.playlistTitle})
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
            res.status(200).json({'message':'Playlist with same name already exists. Please choose another name'});
            
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
    Playlist.find({'playListVisibilityScope':'Public'})
    .lean()
    .select('id playlistTitle playlistDescription songsInPlaylist createdByUser created_date')
    .populate('songsInPlaylist.songs')
    
    .then(playlists=>{
        if(playlists==null){
            res.status(200).json({"message":`There isn't any playlist to show currently`});
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

const fetchAllReviewforParticularSong = (req,res) => {

    console.log(`Fetching all Reviews for song ${req.params.SongID}`);
    
    SongsReviewsSchema.
    findOne({'reviewedSongID':req.params.SongID}).
    lean().
    populate('reviewedSongID')
    
    
    //.select('id playlistTitle playlistDescription songsInPlaylist createdByUser created_date')
    //.populate('songsInPlaylist.songs')
    
    .then(reviews=>{
        if(reviews==null){
            res.status(200).send({"message":`There aren't any reviews to show currently`});
        }
        else {
            console.log('Reviews fetched successully');
            res.status(200).json({
                count:reviews.length,
                reviews:reviews

            });
            
        }
    })
    .catch(error=>{
        console.log(`Got error ${error} while Fetching reviews for song ${req.params.songID}`);
        res.status(500).send({"message":`Technical Error Occured! Please contact the system administrator !`});
    })

    
};

const updatePlaylistAttributes = (req,res)=>{
    console.log(`Executing updatePlaylistAttributes`)
    let playlistID = req.params.playlistID;
    let userRequestingUpdate = req.body.userEmail;

    console.log(`Updating Playlist attributes of playlist ${playlistID}`);
    const entries = Object.keys(req.body);
    const updates = {};
    for (let i = 0; i < entries.length; i++) {
        updates[entries[i]] = Object.values(req.body)[i]
        console.log(updates[entries[i]]);
    }
    let newJSON = JSON.stringify(updates) 
    console.log(`Updating for ${newJSON}`);

    Playlist.findOne({ _id : playlistID })
    .then(results=>{
        if(results != null) {
            if(results.createdByUser === userRequestingUpdate) {
                if(req.body.songsInPlaylist) {
                    console.log(`Updating songs array for id ${results._id}`);
                    Playlist.updateOne(
                        {_id: playlistID}, 
                        {
                            $push: 
                            {
                                songsInPlaylist: req.body.songsInPlaylist
                            }
                        })
                    .then(result=>{
                        res.status(200).json({'message':'Song attributes updated','song':result});
                    })
                    .catch(error=>{
                    res.status(500).json({"message":`Encountered ${error} while updating ${playlistID}`});
                    })
                }  
                else {
                    console.log('Triggering regular update');
                    Playlist.updateOne(
                        {_id: playlistID}, 
                        {
                            $set: 
                            {
                                playlistTitle: req.body.playlistTitle
                            }
                        })
                    .then(result=>{
                        res.status(200).json({'message':'Song attributes updated','song':result});
                    })
                    .catch(error=>{
                    res.status(500).json({"message":`Encountered error while updating ${song_id}`});
                    })
            
                }



            }
            else {
                console.log(`Unauthorized access`);
                res.status(403).send({
                    'message':'Access Denied'    
                });
            }
            
        }
        else {
            res.status(500).send({
                'message':'No such playlist found'
            });
        }
        
    })
    .catch(error=>{
        console.log(`Got an error while updating the record in the database ${error}`);
        res.status(500).send({"message":`Technical Error Occured! Please contact the system administrator !`});
    });

};


const fetchTopTenSongsByGivenFilter = (req,res) => {
    
    let filterBy = req.query?req.query.id:null
    console.log(`Fetching top 10 songs by ${filterBy}`);
    
    SongsReviewsSchema
    .aggregate([
        {
            $project: {
                item: 1,
                reviewedSongID:"$reviewedSongID",
                ratingsGivenByUser:"$ratingsGivenByUser",
                numberOfReviews: { $cond: { if: { $isArray: "$ratingsGivenByUser" }, then: { $size: "$ratingsGivenByUser" }, else: "NA"} },
                ratingAvg: 
                { 
                    $avg: "$ratingsGivenByUser.rating"
                }
            }
            
        },
        
        {
            $sort: {
                numberOfReviews : -1
            }  
        },
        {
            $limit: 10
        },
        // {
        //     $lookup :{
        //         from :"Songs",
        //         localField:"reviewedSongID",
        //         foreignField:"_id",
        //         as:"songDetails"
        //     }
        // },
        {
            $lookup:{
                from:"Songs",
                let: {
                    id: "$reviewedSongID"
                  },
                pipeline:[
                    {
                        $match:{
                            $expr:{
                                $and:[
                                    { $ne: [ false, "$songVisibility" ] },
                                    { $eq: [ "$_id", "$$id" ] }
                                ]
                            }
                        }
                    }
                ],
                as:"songDetails"
            }
        },
        
        // {
        //     $group: {
        //         _id: "$reviewedSongID",
        //         avgNumberOfReviews: {
        //             $avg:"$rating"
        //         }
        //     }
        // },
        { 
            "$unwind": "$songDetails" 
        },
        // {"$match":{"Songs.songVisibility":true}}
        
    ])
    .then(reviews=>{
        console.log(``);
        if(reviews==null){
            res.status(200).send({"message":`There aren't any music to show currently`});
        }
        else {
            console.log('Top 10 most reviewed songs fetched successully');
            
           
            console.log(reviews);
            res.status(200).json({
                reviews
            });
            
        }
    })
    .catch(error=>{
        console.log(`Got error ${error} while Fetching reviews for song ${req.params.songID}`);
        res.status(500).send({"message":`Technical Error Occured! Please contact the system administrator !`});
    });

    
};

const fetchAllSongs = (req,res) => {
    let searchQuery = req.query.searchQuery?req.query.searchQuery:undefined;
    let showAllHiddenSongsQuery = req.query.showAllHiddenSongsQuery?req.query.showAllHiddenSongsQuery:undefined;
    if( searchQuery !== undefined) {
        console.log(`We have filter to be applied`);
        const regex = new RegExp(escapeRegex(searchQuery), 'gi');
        console.log(`Fetching all songs`);
        Songs.find(
            {
                $or:[
                    {title:regex},
                    {artist:regex},
                    {genre:regex}
                    
                ]
            })
            .then(reviews=>{
                console.log(reviews);
                if(reviews!==null) {
                    console.log("All songs fetched successfully");
                    res.status(200).json({'songs':reviews});
                }
                else {
                    console.log(`Need to update the song with id ${song_id}`);
                    res.status(200).json({'message':'No songs found in the database'});
                }
                
            }).catch(err=>{
                console.log(err);
                res.status(500).json({
                    "message":`Unable to fetch songs`
                });
            });

    }
    else if(showAllHiddenSongsQuery!== undefined){
        console.log('Fetching all hidden songs to show to admin');
        Songs.find({ songVisibility:{$ne:true}})
        .then(result=>{
            console.log(`got results ${result}`)
            res.status(200).json({'songs':result});
        })
        .catch(error=>{
            console.log(`Got error ${error}`);
            res.status(500).json({
                "message":`Unable to fetch songs`
            });
        })
    }
    else{
        console.log('Fetching all songs without any filter');
        Songs.find()
    .then(result=>{
        console.log(result);
        if(result!==null) {
            console.log("All songs fetched successfully");
            res.status(200).json({'songs':result});
        }
        else {
            console.log(`Need to update the song with id ${song_id}`);
            res.status(200).json({'message':'No songs found in the database'});
        }
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            "message":`Unable to fetch songs`
        });
    });
    
    }
    
};

const fetchPlaylistsOfUser = (req,res)=>{
    console.log(`Executing Controller to fetch user specific playlists`);
    
    Playlist.find({ createdByUser: req.params.userEmail })
    .lean()
    .populate('songsInPlaylist.songs')
    .then(result=>{
        console.log(result);
        if(result!==null) {
            console.log("All users playlists fetched successfully");
            res.status(200).json({'playlists':result});
        }
        else {
            console.log(`Need to update the song with id ${song_id}`);
            res.status(200).json({'message':`No playlist found in the database for user ${req.body.userEmail}`});
        }
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            "message":`Unable to fetch playlists`
        });
    });
    
};

const deleteExistingSongFromUserPlaylist = (req,res)=>{
    console.log(`Executing controller to delete songs from Playlist`);
    let playlist_id = req.body.playlistID;
    let song_id = req.body.songsInPlaylist;

    console.log(`Removing ${song_id} from ${playlist_id}`);
    Playlist.update(
        {
             _id: playlist_id 
        },
        { 
            $pull: 
            { songsInPlaylist: 
                { 
                    songs: song_id
                }
            } 
        }
    )
    .then(result=>{
        console.log(result);
        if(result!==null) {
            console.log("Id found in the Database");
            res.status(200).json({
                "result":result
            });
        }
        else {
            console.log(`No such id exists in the database. Please enter correct ID`);
            res.status(200).json({
                "message":"No such id ${playlist_id} exists in the database. Please enter correct ID"
            });
            
        }
        
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            "message":`Unable to modify playlist_id ${playlist_id}`
        });
    });
    
};

const fetchLoggedInUserDetails = (req,res)=>{
    //Checking for query params. If exists, then get attributes of particular user
    console.log(`query parameters are ${req.query.user}`);
    if(req.query.user !== undefined) {
        users.findOne({'email':req.query.user})
        .then(result=>{
            console.log(result);
            if(result!==null) {
                console.log("Id found in the Database");
                res.status(200).json({
                    "Users":result
                });
            }
            else {
                console.log(`No users exists in the database.`);
                res.status(200).json({
                    "message":"No  user exists in the database."
                });
                
            }
            
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                "message":`Technical error occured while fetching users`
            });
    });
    }
    // Otherwise fetch all users
    else {
        users.find({})
        .then(result=>{
            console.log(result);
            if(result!==null) {
                res.status(200).json({
                    "Users":result
                });
            }
            else {
                console.log(`No users exists in the database.`);
                res.status(200).json({
                    "message":"No  user exists in the database."
                });
                
            }
            
        }).catch(err=>{
            console.log(err);
            res.status(500).json({
                "message":`Technical error occured while fetching users`
            });
        });
    }
};

function updateSongsParameter(req,res) {
    // let songIDToUpdate =  req.body.songID;
    // let isHidden = req.body.songVisibility;
    console.log(`songID got is ${req.body.songID} and isHidden is ${req.body.songVisibility}`)
    Songs.updateOne({'_id': req.body.songID}, {$set: {'songVisibility': req.body.songVisibility}})
    .then(result=>{
        res.status(200).json({'message':'Song attributes updated','result':'Success'});
    })
    .catch(error=>{
    res.status(500).json({"message":`Encountered error ${error} while updating ${req.body.songID}`});
    })  
}

//Controller for updating user roles by Admin
function updateRolesOfUsersByAdmin(req,res) {
    let updateResults = [];
    
    
    for (let i = 0; i < req.body.selectedUsersJSON.length; i++) {

        // users.find({'_id':req.body.selectedUsersJSON[i].id})
        users.findByIdAndUpdate({_id:req.body.selectedUsersJSON[i].id},{role:req.body.selectedUsersJSON[i].newRole})
        .then(res=>{
            console.log(`result after updating is ${res}`);
            updateResults.push(res.role);
        })
        .catch(error=>{
            console.log(`error during updating is ${error}`);
            res.status(500).json({"message":error})
        });
        
    }

    res.status(200).json(
        {
            'status':'Success',
            'result':updateResults
        }
    );
}

// Function to toggle visibility of songs from false to true
function updateSongVisibilityToTrueByAdmin(req,res) {
    let updateResults = [];
    for (let i = 0; i < req.body.selectedSongsJSON.length; i++) {

        // users.find({'_id':req.body.selectedUsersJSON[i].id})
        Songs.findByIdAndUpdate({_id:req.body.selectedSongsJSON[i].id},{songVisibility:req.body.selectedSongsJSON[i].songVisibility})
        .then(res=>{
            console.log(`result after updating is ${res}`);
            updateResults.push(res.role);
        })
        .catch(error=>{
            console.log(`error during updating is ${error}`);
            res.status(500).json({"message":error})
        });
        
    }

    res.status(200).json(
        {
            'status':'Success',
            'result':updateResults
        }
    );
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = {
    addNewSong,createNewPlaylist,fetchAllPublicPlaylists,saveUserReviewsForGivenSong,
    fetchAllReviewforParticularSong,
    updatePlaylistAttributes,
    fetchTopTenSongsByGivenFilter,
    fetchAllSongs,fetchPlaylistsOfUser,
    deleteExistingSongFromUserPlaylist,fetchLoggedInUserDetails,
    updateSongsParameter,updateRolesOfUsersByAdmin,
    updateSongVisibilityToTrueByAdmin

};