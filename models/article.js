const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Question Schema

const ArticlesSchema = mongoose.Schema({
    _id : { type : Number,auto: true}, 
    Article_Heading : { type:String, required:true },
    Description : { type:String, required:true },
    Article_Level : { type:String, required:true},
    Topic_Name : { type:String, required:true},
    Sub_Topic_Name : { type:String, required:true} }, { _id: false });

    const Article = module.exports = mongoose.model('Article', ArticlesSchema);
    
    //--- Add New Question ----
    
    module.exports.addArticle = function(newArticle,callback){
        newArticle.save(callback);
    }