const mongoose = require('mongoose');

const SongReviewSchema = mongoose.Schema({
   
//    reviewedSongID: {
//           type: mongoose.Schema.Types.ObjectId, 
//           ref: 'Songs',
//           required: 'Mandatory song selection to review it'
//      },
//     ratingsGivenByUser: [{
//         type:Number,
//         default:1
//     }],
     reviewedSongID:{
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Songs',
          required: 'Song id missing for review'
    },
    ratingsGivenByUser: [{
          rating    :{
          type: Number
        },
        ratedByUser:{
          type:String,
          required:'User entity is a must to give the reviews'
        },
        creation_date:{
          type:Date,
          default:Date.now()
        },
        comments:{
          type:String
        }
    }]
//    ratedByUser : [{
//         type: String,
//         lowercase:true,
//         required: 'User required entity for giving ratings'
//    }],
//    creation_date:[{
//         type:Date,
//         default:Date.now()
//    }]
});
module.exports = mongoose.model('SongsReviews',SongReviewSchema,'SongsReviews');