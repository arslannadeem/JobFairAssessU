const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Course = require('../models/course');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

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


module.exports=router;