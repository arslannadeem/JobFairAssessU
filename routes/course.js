const express = require('express');
const router = express.Router();
const Course = require('../models/course');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

// --------------------  Add New Course  -----------------------

router.post('/newCourse',(req,res,next)=>{
    console.log("router")

    let newCourse = new Course({
        _id : 2,
        Course_Name : 'DataStructure',
        Topics : [{_id : 1, Topic_Name : 'LinkList', SubTopics : [{_id : 1, Sub_Topic_Name : 'Single LinkList'},{_id : 2, Sub_Topic_Name : 'Double LinkList'}]},
        {_id : 2, Topic_Name : 'Graph', SubTopics : [{_id : 1, Sub_Topic_Name : 'Adjecent List'},{_id : 2, Sub_Topic_Name : 'Adjecent Matrix'}]}]
    });

    Course.addCourse(newCourse,(err,course)=>{
        if(err){
            res.json({success : false,msg : 'Failed to Add New Course'});
        }
        else
        {
            res.json({success : true,msg : 'Course Registered'});
        }
    });
});

router.post('/newTopics',(req,res,next)=>{
    
    data = {"name" : req.body.name,"list" : req.body.list};
    // let newCourse = new Course({
    //     _id : 1,
    //     Course_Name : 'OOP',
    //     Topics : { _id : 1,Topic_Name : 'Pointer', SubTopics : { _id : 1,Sub_Topic_Name : 'Null Pointer'}}
    // });

    // let newCourse = new Course({})
    
    Course.addTopics(data,(err,course)=>{
        if(err){
            res.json({success : false,msg : 'Failed to Add New Course'});
        }
        else
        {
            res.json({success : true,msg : 'Course Registered'});
        }
    });
});

// ------------------------  GET Course  -----------------------

router.get('/getAllCourses', passport.authenticate('jwt', { session: false }),function(req, res)
{   
    Course.getAllCourse((err,list)=>{
        if(err) throw err;
        if(!list){
            return res.json({success:false,msg : 'Courses not found'});
        }
        var return_obj = { 'success' : true , 'data' : list};
        return res.json(return_obj);
    });
});  

/*
// --------------------  Add New Course  -----------------------

router.post('/newCourse',(req,res,next)=>{
    let newCourse = new Course({
        Course_Name : 'DataBase',
        Topics : ["Normalization","SQL","NoSQL"]
    });

    Course.addCourse(newCourse,(err,course)=>{
        if(err){
            res.json({success : false,msg : 'Failed to Add New Course'});
        }
        else
        {
            res.json({success : true,msg : 'Course Registered'});
        }
    });
});

// ------------------------  GET Course  -----------------------

router.get('/getAllCourses', passport.authenticate('jwt', { session: false }),function(req, res)
{   
    Course.getAllCourse((err,list)=>{
        if(err) throw err;
        if(!list){
            return res.json({success:false,msg : 'Courses not found'});
        }
        var return_obj = { 'success' : true , 'data' : list};
        return res.json(return_obj);
    });
});    
    
    //Course.getCourseByName
    // Course.getCourseByName()
    // {
        
    //         //res.json(msg: docs);
    //         console.log(docs);
    // }
        
    // Task.getAllTasks(err, docs){
        
    //           if(err) return res.json(error: err)  
    //           res.json(msg: docs);    
    //         }

    // console.log('Courses');
    
    // Course.find({}).exec().then(res => {
    // //console.log(res.Course_Name)
    // }).catch((err)=>
    // {
    //     res.send("error")
    // });

    // Course.find({}).lean().exec().then((list)=>{
    //     //console.log(list.Course_Name)
    //     res.json(list)
    // }).catch((err)=>
    // {
    //     //res.send("error")
    // });

    // Course.getAllCourse((err,list)=>{
    //     if(err){
    //         res.json({success : false,msg : 'Failed to Get Courses'});
    //     }
    //     else{
    //         return res.json({success : true,msg : 'Course get succesfully',data : list});
    //     }
    // });
    // var id = { _id : "5a01c80f589a760c3948709e"};
    // Course.findById(id , function(err, list){
    //     if(err){
    //       console.log(err);
    //     } else{
    //         console.log(list.Course_Name);
    //         // res.render('user-list', users);
    //         // console.log('retrieved list of names', users.length, users[0].name);
    //         return res.json({success : true,msg : 'Course get succesfully',data : list});
    //     }
    // })

    //var query = {"Course_Name" : "Data Structure"};

    // Course.getCourseByName(query,(err,list)=>{
    // {
    //     if(err)
    //     {
    //         console.log(err);
    //     } 
    //     else
    //     {
    //         console.log(list.Course_Name);
    //                 // res.render('user-list', users);
    //                 // console.log('retrieved list of names', users.length, users[0].name);
    //                // return res.json({success : true,msg : 'Course get succesfully',data : list});
    //     }
    // }

//});
*/

module.exports=router;