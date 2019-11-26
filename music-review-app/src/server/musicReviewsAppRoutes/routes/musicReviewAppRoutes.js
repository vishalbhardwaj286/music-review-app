const {addNewSong,createNewPlaylist,fetchAllPublicPlaylists,saveUserReviewsForGivenSong} = require('./../controllers/musicReviewAppController');

const routes = (app) => {
    console.log(`Here`);    
    app.route('/secure/uploadNewSong/:title')
    
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

    app.route('/secure/createNewPlaylist/:playlistTitle')
    
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
        
    });

    app.route('/secure/fetchPublicPlaylists')
    .get((req,res,next)=>{
        console.log(`Fetching all public playlists`);
        next();
    },(req,res)=> {
        fetchAllPublicPlaylists(req,res);
    });
    
    app.route('/secure/addReview/:SongId')
    .post((req,res)=> {
        console.log(`Request Reached for adding reviews to a song`);
        saveUserReviewsForGivenSong(req,res);        
    });
}
module.exports = routes;