const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const SongsSchema = mongoose.Schema({
   title : {
        type: String,
        required: 'Song title required',
        lowercase:true,
        min:3,
        unique:true
   },
   artist :{
        type : String,
        required: 'Artist of the song required',
        lowercase:true,
        min:3
   },
   genre : {
        type: String,
        lowercase:true,
        default: 'Rock',
   },
   
   year : {
        type: Date,
        default:Date.now
   },
   reviews: {
        type:mongoose.Schema.Types.Mixed,
        default: 'Not Reviewed yet !',
        lowercase:true,
   },
   addedByUser:{
          type:String,
          lowercase:true
   },
   created_date:{
    type: Date,
    default: Date.now
   }

});
SongsSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('Songs',SongsSchema,'Songs');