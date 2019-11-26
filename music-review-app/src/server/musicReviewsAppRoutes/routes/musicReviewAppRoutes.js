const {addNewSong} = require('./../controllers/musicReviewAppController');

const routes = (app) => {
    console.log(`Here`);    
    app.route('/secure/uploadNewSong/:title')
    
    .put((req,res,next)=> {
        //middlerware
        console.log(`Request parameter got in the PUT request is ${req.params.itemName}`);
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
        
    })

    
}
module.exports = routes;