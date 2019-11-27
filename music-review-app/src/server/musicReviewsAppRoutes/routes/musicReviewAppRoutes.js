const {
    addNewSong,createNewPlaylist,fetchAllPublicPlaylists,
    saveUserReviewsForGivenSong,
    fetchAllReviewforParticularSong,
    updatePlaylistAttributes,
    fetchTopTenSongsByGivenFilter
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
        addNewSong(req,res);        
        next();
    },(req,res) => {
        let val= null;
        console.log('Saving the items');
        // addNewItem(req,res);
        return;
        
    });

    app.route('/secure/playlist/:playlistTitle')
    
    .put((req,res,next)=> {
        //middlerware
        console.log(`Request parameter got in the PUT request is ${req.params.playlistTitle}`);
        //console.log(req);
        console.log(`Request from :${req.originalUrl}`);
        console.log(`Request type :${req.method}`);
        createNewPlaylist(req,res);        
        next();
    },(req,res) => {
        let val= null;
        console.log('Saving the items');
        // addNewItem(req,res);
        return;
        
    })

    .post((req,res,next)=>{
        console.log(`Updating Playlist ${req.params.playlistTitle}`);
        //Parsing request body to find the to-update-element.
        next();
    },(req,res) =>{
        updatePlaylistAttributes(req,res);
    });

    app.route('/secure/fetchAllPublicPlaylists')
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

    app.route('/secure/fetchSongs')

    .get((req,res)=>{
        
        fetchTopTenSongsByGivenFilter(req,res);
    });
    
    
}
module.exports = routes;