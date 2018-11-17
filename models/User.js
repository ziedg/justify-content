const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var childSchema = new Schema({ date:Date,numberOfWords:Number });

const UserSchema = new Schema({
   email:String,
    text:[childSchema]

})
   

const User = mongoose.model('User',UserSchema);


module.exports=User;