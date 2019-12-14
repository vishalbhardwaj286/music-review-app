const {
    addNewSong,createNewPlaylist,fetchAllPublicPlaylists,
    saveUserReviewsForGivenSong,
    fetchAllReviewforParticularSong,
    updatePlaylistAttributes,
    fetchTopTenSongsByGivenFilter,fetchAllSongs,fetchPlaylistsOfUser,
    deleteExistingSongFromUserPlaylist, fetchLoggedInUserDetails,
    updateSongsParameter,updateRolesOfUsersByAdmin

} = require('./../controllers/musicReviewAppController');

const routes = (app) => {
    console.log(`Here`);    
    app.route('/secure/song/:title')

    .put((req,res,next)=> {
        //middlerware
        console.log(`Request parameter got in the PUT request is ${req.params.title}`);
        //console.log(req);
        console.log(`Request from :${req.originalUrl}`);
        console.log(`Request type :${req.method}`);
                
        next();
    },(req,res) => {
        console.log('Saving the items');
        addNewSong(req,res);
        console.log('Song saved successfully');
        return;
        
    });

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
        console.log('Saving the items');
        createNewPlaylist(req,res);        
    })
    
    .post((req,res,next)=>{
        console.log(`Updating Playlist ${req.params.playlistID}`);
        
        next();
    },(req,res) =>{
        updatePlaylistAttributes(req,res);
    });

    app.route('/public/fetchAllPublicPlaylists')
    .get((req,res,next)=>{
        console.log(`Fetching all public playlists`);
        next();
    },(req,res)=> {
        fetchAllPublicPlaylists(req,res);
    });
    
    app.route('/secure/reviews/:SongID')
    
    .get((req,res)=>{
        console.log(`Fetching reviews for particular song id ${req.params.SongID}`);
        fetchAllReviewforParticularSong(req,res);
    })
    
    .post((req,res)=> {
        console.log(`Request Reached for adding reviews to a song`);
        saveUserReviewsForGivenSong(req,res);        
    });

    app.route('/public/fetchTopTenSongs')

    .get((req,res)=>{
        console.log(`Request got ${req}`)
        fetchTopTenSongsByGivenFilter(req,res);
    });
    
    app.route('/secure/songs')
    
    .get((req,res)=>{
        
        console.log(`Handling Request to fetch all songs`);
        
        let query = req.query.searchQuery;
        fetchAllSongs(req,res,query);
    })

    //This route handle all the updates w.r.t to the song
    .post((req,res)=>{
        updateSongsParameter(req,res);
    })
    app.route('/secure/playlists/:userEmail')

    .get((req,res,next)=>{
        console.log(`Handling Request to fetch all playlists of user ${req.params.userEmail}`);
        next()
    },(req,res)=>{
        fetchPlaylistsOfUser(req,res);
    });

    app.route('/secure/playlist/songs/:playlistID')
    
    .post((req,res) =>{
        deleteExistingSongFromUserPlaylist(req,res);
    });

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
        updateRolesOfUsersByAdmin(req,res);
    })
}

    
module.exports = routes;