const express = require('express');
const app = express();
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
var routes = require('./api/routes/userRoutes');
const jsonwebtoken = require('jsonwebtoken');

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/Mini_Project_DB').then(function(){
    console.log("DB connection successful");
},function(err){
    console.log("DB connection failed");
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(function(req,res,next){
    if(req.headers && req.headers.authorization){
        const auth = req.headers.authorization.split(' ');
        console.log(auth);
        if(auth[0]==='JWT'){
            jsonwebtoken.verify(auth[1],'RESTFULAPIs',function(err,decode)  {
                if(err){
                    req.user = undefined;
                    next();
                }
                else{
                    req.user = decode;
                    console.log(decode);
                    next();
                }
            });
        }
        else{
            req.user = undefined;
            next();
        }
    }
    else{
        req.user = undefined;
        next();
    }
});
routes(app);
//Server Port listening
app.listen(port,()=>{
    console.log("Application Server Started on : "+ port);
})
module.exports = app;