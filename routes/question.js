const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const Question = require('../models/question');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

// --------------------  Add New Question  -----------------------

router.post('/newQuestion',(req,res,next)=>{
    
    // let newQuestion5 = new Question({
    //     _id:5,
    //     Question_Type : 'Easy',
    //     Description : 'Linked lists are best suited .....',
    //     Topic_Name : 'LinkList',
    //     Choices : [
    //         {_id:1,Status:false,Description:"for relatively permanent collections of data."},
    //         {_id:2,Status:true,Description:"for the size of the structure and the data in the structure are constantly changing."},
    //         {_id:3,Status:false,Description:"data structure"},
    //         {_id:4,Status:false,Description:"for none of above situation"}]
    // });

    Question.addQuestion(newQuestion5,(err,question)=>{
        if(err){
            res.json({success : false,msg : 'Failed to Add New Question'});
        }
        else
        {
            res.json({success : true,msg : 'Question Added'});
        }
    });
});

// --------------------  Get Question  -----------------------

router.post('/getAllQuestion',(req,res,next)=>{

    Question.getQuestions((err,list)=>{
        if(err) throw err;
        if(!list){
            return res.json({success:false,msg : 'Courses not found'});
        }
        var return_obj = { 'success' : true , 'data' : list};
        return res.json(return_obj);
    });
});

router.post('/getQuestions',(req,res,next)=>{

    data = {"course" : req.body.course,"topic" : req.body.topic};

        Question.getQuestions(data,(err,list)=>{
            if(err) throw err;
            if(!list){
                return res.json({success:false,msg : 'Courses not found'});
            }
            var return_obj = { 'success' : true , 'data' : list};
            return res.json(return_obj);
        });
    });

module.exports=router;