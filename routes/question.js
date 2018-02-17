const express = require('express');
const router = express.Router();
const Question = require('../models/question');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

// --------------------  Add New Question  -----------------------

router.post('/newQuestion',(req,res,next)=>{    

    Question.addQuestion(newQuestion2,(err,question)=>{
        if(err){
            console.log("not Insert");
            res.json({success : false,msg : 'Failed to Add New Question'});
        }
        else
        {
            console.log("Insert");
            res.json({success : true,msg : 'Question Added'});
        }
    });
});

/*
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
*/

router.post('/getAllQuestions',(req,res,next)=>{

    console.log("routes");
    data = {"course" : req.body.course,"topic" : req.body.topic};

        Question.get_Questions_By_Topic_Name(data,(err,list)=>{
            if(err) throw err;
            if(!list){
                return res.json({success:false,msg : 'Questions not found'});
            }
            var return_obj = { 'success' : true , 'data' : list};
            return res.json(return_obj);
        });
    });


module.exports=router;

    // ------------------------- QUESTIONS DATA ------------------

    // let newQuestion5 = new Question({
    //     _id : 1,
    //     Question_Type : 'Easy',
    //     Description : 'An array elements are always stored in ________ memory locations.',
    //     Topic_Name : 'Arrays',
    //     Sub_Topic_Name : 'Initialization',
    //     Choices : [
    //         {_id:1,Status:true,Description:"Sequential"},
    //         {_id:2,Status:false,Description:"Random"},
    //         {_id:3,Status:false,Description:"Sequential and Random"},
    //         {_id:4,Status:false,Description:"None of the above"}]
    // });

    // let newQuestion4 = new Question({
    //     _id : 2,
    //     Question_Type : 'Easy',
    //     Description : 'In C Programming, If we need to store word “INDIA” then syntax is as below – ' +
    //     ' + char name[]; + ' +
    //     ' + name = “INDIA”, + ',
    //     Topic_Name : 'Arrays',
    //     Sub_Topic_Name : 'Initialization',
    //     Choices : [
    //         {_id:1,Status:false,Description:"char name[6] = {'I','N','D','I','A'};"},
    //         {_id:2,Status:true,Description:"char name[6] = {'I','N','D','I','A','\0'}"},
    //         {_id:3,Status:false,Description:"char name[6] = {'I','N','D','I','A'}"},
    //         {_id:4,Status:false,Description:"name =INDIA "}]
    // });

    // let newQuestion3 = new Question({
    //     _id : 3,
    //     Question_Type : 'Easy',
    //     Description : 'What is right way to Initialize array?',
    //     Topic_Name : 'Arrays',
    //     Sub_Topic_Name : 'Initialization',
    //     Choices : [
    //         {_id:1,Status:true,Description:"int num[6] = { 21, 41, 2, 15, 4, 5 };"},
    //         {_id:2,Status:false,Description:"int n{} = { 21, 41, 2, 15, 4, 5 };"},
    //         {_id:3,Status:false,Description:"int n{6} = { 21, 41, 2 };"},
    //         {_id:4,Status:false,Description:"int n(6) = { 21, 41, 2, 15, 4, 5 };"}]
    // });

    // let newQuestion2 = new Question({
    //     _id : 4,
    //     Question_Type : 'Easy',
    //     Description : 'What is meaning of following declaration ? \n int arr[20];',
    //     Topic_Name : 'Arrays',
    //     Sub_Topic_Name : 'Initialization',
    //     Choices : [
    //         {_id:1,Status:true,Description:"Array of size 20 that can have integer address"},
    //         {_id:2,Status:false,Description:"None of these"},
    //         {_id:3,Status:false,Description:"Integer Array of size 20"},
    //         {_id:4,Status:false,Description:"Array of Size 20"}]
    // });
