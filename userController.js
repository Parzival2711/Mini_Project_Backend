const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserSchema = require('../models/userModel.js');
const User = mongoose.model('User',UserSchema);

exports.register = function(req,res){
    var newUser = new User(req.body);
    newUser.hash_password = bcrypt.hashSync(req.body.password,10);
    newUser.save(function(err,user){
        if(err){
            res.status(400).send({
                message:err
            });
        }
        else{
            return res.json(user);
        }
    });
};

exports.sign_in = async function(req,res){
    const filter = {email:req.body.email};
    const result = await User.findOne(filter);
    if(result!= null){
        const pwd_check = result.comparePassword(req.body.password);
        if(pwd_check == true){
            return res.status(200).json({token : jwt.sign({email:result.email, fullName:result.fullName, _id:result._id}, 'RESTFULAPIs')});
        }
        else{
            return res.status(401).send("Invalid Password");
        }
    }
    else{
        return res.status(401).send("Invalid Email");
    }
};
exports.loginRequired = function(req,res,next){
    if(req.user){
        next();
    }
    else{
        return res.status(401).json({message:"Unauthorized User!!"});
    }
}
exports.get_profile = function (req,res,next){
    if(req.user){
        res.status(200).send(req.user);
        next();
    }
    else{
        return res.status(401).json({message:'Invalid Token'});
    }
};
