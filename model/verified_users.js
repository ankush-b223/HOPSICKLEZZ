const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({

    username: {type:String , required: true , unique:true },
    password: {type:String , required:true , unique: true}
    },
    
    {collection:'verified_users'}

)

const model = mongoose.model('UserSchema', UserSchema);

module.exports = model;