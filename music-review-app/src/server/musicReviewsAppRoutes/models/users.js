const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');



const users = mongoose.Schema({
   email : {
        type: String,
        required: 'Playlist title required',
        lowercase:true,
        min:3,
        unique:true
   },
   role :{
        type : String,
        default:'Regular User'
   },
   updated_date: {
        type:Date,
        default:Date.now
   }
});
users.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('users',users,'users');