// Importing all controller functions from music-controller
const {
    addNewSong,createNewPlaylist,fetchAllPublicPlaylists,
    saveUserReviewsForGivenSong,
    fetchAllReviewforParticularSong,
    updatePlaylistAttributes,
    fetchTopTenSongsByGivenFilter,fetchAllSongs,fetchPlaylistsOfUser,
    deleteExistingSongFromUserPlaylist, fetchLoggedInUserDetails,
    updateSongsParameter,updateRolesOfUsersByAdmin,updateSongVisibilityToTrueByAdmin

} = require('./../controllers/musicReviewAppController');
const Joi = require('joi');

const routes = (app) => {
    console.log(`Here`);    
    app.route('/secure/song/:title')

    .put((req,res,next)=> {
        //middlerware before executing actual request
        console.log(`Request parameter got in the PUT request is ${req.params.title}`);
        
        console.log(`Request from :${req.originalUrl}`);
        console.log(`Request type :${req.method}`);
                
        next();
      
    },(req,res) => {
        let val= null;
        const joiSchema = Joi.object().keys({
            'title' : Joi.string().trim().required(),
            'artist' : Joi.string().trim().required(),
            'album' : Joi.string().trim().required(),
            'genre' : Joi.string().trim().required(),
            'year' : Joi.string().trim().allow('', null).empty(['', null]).default(Date.now()),
            'reviews':Joi.string().trim().allow('', null).empty(['', null]),
            'addedByUser' : Joi.string().trim().required()
        });
        val = validateRequestWithJoi(req.body,joiSchema);
        if(val !==null) { 
            console.log('Validation results has error'+`${val}`);
            res.status(500).send({'error':val});
        }
        else {
            console.log('Saving the items');
            addNewSong(req,res);
        }
        
        return;
        
    });

    //Routes to handle All secured REST calls related to Playlist operations . For instance , below is used to create or update 
    // playlist data 

    app.route('/secure/playlist/:playlistID')
    
    .put((req,res,next)=> {
        //middlerware
        console.log(`Request parameter got in the PUT request is ${req.params.playlistID}`);
        //console.log(req);
        console.log(`Request from :${req.originalUrl}`);
        console.log(`Request type :${req.method}`);
        next();
        
    },(req,res) => {
        let val= null;
        const joiSchema = Joi.object().keys({
            'playlistTitle' : Joi.string().trim().required(),
            'playlistDescription' : Joi.string().trim().allow('', null).empty(['', null]),
            'songsInPlaylist' : Joi.array().required(),
            'playListVisibilityScope' : Joi.string().trim().allow('', null).empty(['', null]).default('Private'),
            'createdByUser' : Joi.string().trim().required(),
            
        });
        val = validateRequestWithJoi(req.body,joiSchema);
        if(val !==null) { 
            console.log('Validation results has error'+`${val}`);
            res.status(500).send({'error':val});
        }
        else {
            console.log('Saving the items');
            createNewPlaylist(req,res);
        }
        
        return;
        
    })
    
    .post((req,res,next)=>{
        console.log(`Updating Playlist ${req.params.playlistID}`);
        next();
    },(req,res) =>{
        updatePlaylistAttributes(req,res);
        
    });

    // Route to handle Guest user request to fetch all public playlists
    app.route('/public/fetchAllPublicPlaylists')
    .get((req,res,next)=>{
        console.log(`Fetching all public playlists`);
        next();
    },(req,res)=> {
        fetchAllPublicPlaylists(req,res);
    });
    
    //Secure route to handle reviews for a given song. It handles Fetching all reviews and posting a new review of user for given song
    app.route('/secure/reviews/:SongID')
    
    // Use to fetch all reviews
    .get((req,res)=>{
        console.log(`Fetching reviews for particular song id ${req.params.SongID}`);
        fetchAllReviewforParticularSong(req,res);
    })
    
    // Use to Post user reviews for given song
    .post((req,res)=> {
        console.log(`Request Reached for adding reviews to a song`);
    
        let val= null;
        const joiSchema = Joi.object().keys({
            'reviewedSongID' : Joi.string().trim().required(),
            // 'ratingsGivenByUser' : Joi.object().required(),
            'ratingsGivenByUser' : Joi.object(
                { 
                    rating: Joi.number().integer().min(1).allow('', null).empty(['', null]).default(5),
                    ratedByUser:Joi.string().required(),
                    comments:Joi.string().allow('', null).empty(['', null])
                }
                )
            
        });
        val = validateRequestWithJoi(req.body,joiSchema);
        if(val !==null) { 
            console.log('Validation results has error'+`${val}`);
            res.status(500).send({'error':val});
        }
        else {
            console.log('Saving the items');
            saveUserReviewsForGivenSong(req,res);
        }
        
        return; 
    });

    // API Route to Fetch Top Ten Songs to Display to Regular User
    app.route('/public/fetchTopTenSongs')

    .get((req,res)=>{
        console.log(`Request got ${req}`)
        fetchTopTenSongsByGivenFilter(req,res);
    });
    
    app.route('/public/songs')
    .get((req,res)=>{
        
        console.log(`Handling Request to fetch all songs`);
        fetchAllSongs(req,res);
    })

    app.route('/secure/songs')
    
    .get((req,res)=>{
        
        console.log(`Handling Request to fetch all songs`);
        fetchAllSongs(req,res);
    })

    //This route handle all the updates w.r.t to the song
    .post((req,res)=>{
        updateSongsParameter(req,res);
    })

    // Bulk Updates of songs visibility of different songs
    .patch((req,res)=>{
        updateSongVisibilityToTrueByAdmin(req,res)
    });

    // This route handles all playlists of logged in User
    app.route('/secure/playlists/:userEmail')

    .get((req,res,next)=>{
        console.log(`Handling Request to fetch all playlists of user ${req.params.userEmail}`);
        next()
    },(req,res)=>{
        fetchPlaylistsOfUser(req,res);
    });

    // Route to handle deletion of songs from playlist by its owner
    app.route('/secure/playlist/songs/:playlistID')
    
    .post((req,res) =>{
        const joiSchema = Joi.object().keys({
            'playlistID' : Joi.string().trim().required(),
            'songsInPlaylist' : Joi.string().trim().required(),
            'createdByUser' : Joi.string().trim().required()
        });
        val = validateRequestWithJoi(req.body,joiSchema);
        if(val !==null) { 
            console.log('Validation results has error'+`${val}`);
            res.status(500).send({'error':val});
        }
        else {
            console.log('Saving the items');
            deleteExistingSongFromUserPlaylist(req,res);
        }
        
        return; 
        
    });

    // Route to fetch all users by the admin so as to grant access to them
    app.route('/secure/users')

    .get((req,res,next) =>{
        console.log(`Got user id as ${req.params.userID}`);
        next();
    },(req,res)=>{
        fetchLoggedInUserDetails(req,res);
    })

    //Patch API for handling bulk update of attributes of users
    .patch((req,res,next)=>{
        next();
    },(req,res)=>{
        const joiSchema = Joi.object().keys({
        'selectedUsersJSON' : Joi.array().items(
            { 
                id: Joi.string().required(),
                newRole:Joi.string().required()
            })    
        });
        val = validateRequestWithJoi(req.body,joiSchema);
        if(val !==null) { 
            console.log('Validation results has error'+`${val}`);
            res.status(500).send({'error':val});
        }
        else {
            console.log('Saving the items');
            updateRolesOfUsersByAdmin(req,res);
        }
        
        return; 
        
    });
    
    function validateRequestWithJoi(request,joiObject) {
        let val = null;
        Joi.validate(request,joiObject,(err,results)=>{
            if(err) {
                val=err;
                console.log('Inside err');
                console.log(err);
        
            }
            else {
                console.log(`Showing Validation results ${results}`);
                console.log(results);
            }
        });
        return val;
    }
}




// Exporting modules to be used in other module or class which will import this    
module.exports = routes;