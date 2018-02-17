const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');


// Question Schema

const QuestionsSchema = mongoose.Schema({
    _id : { type : Number,auto: true}, 
    Question_Type : { type:String, required:true },
    Description : { type:String, required:true },
    Topic_Name : { type:String, required:true},
    Sub_Topic_Name : { type:String, required:true},
    Choices : [ {  _id : { type : Number} , Status : {type:Boolean,required:true},
                    Description : { type:String, required:true} } ]}, { _id: false });

    const Question = module.exports = mongoose.model('Question', QuestionsSchema);
                    
    //--- Add New Question ----
                    
    module.exports.addQuestion = function(newQuestion,callback){
        newQuestion.save(callback);
    }

    module.exports.get_Questions_By_Topic_Name = function (data,callback) {
        Question.find({ 'Topic_Name': data.topic },callback);
    }

//---------------------------- OLD CODE ---------------------

/*
// Question Schema

const QuestionsSchema = mongoose.Schema({
    _id : { type : Number,auto: true}, 
    Question_Type : { type:String, required:true },
    Description : { type:String, required:true },
    Topic_Name : { type:String, required:true},
    Choices : [ {  _id : { type : Number} , Status : {type:Boolean,required:true},
                    Description : { type:String, required:true} } ]}, { _id: false });

const Question = module.exports = mongoose.model('Question', QuestionsSchema);

//--- Add New Question ----

module.exports.addQuestion = function(newQuestion,callback){
    newQuestion.save(callback);
}

module.exports.getQuestionss = function (callback) {
    Question.find({},callback);
}

module.exports.getQuestions = function (data,callback) {
    Question.find({ 'Topic_Name': data.topic },callback);
}
*/