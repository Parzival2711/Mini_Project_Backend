const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

var UserSchema = new Schema({
    fullName : {
        type : String,
        trim : true,
        required : true
    },
    email: {
        type : String,
        unique : true,
        lowercase : true,
        trim : true,
        required : true
    },
    hash_password: {
        type : String
    },
    created: {
        type: Date,
        default : Date.now
    }
});
UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password,this.hash_password);
};

mongoose.model('User',UserSchema);
module.exports = UserSchema;
//take the 1st non-encrypted string -> encrypt it and then compare with 
//2nd encrypted string
