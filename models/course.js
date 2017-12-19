const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//Course Schema

const CourseSchema = mongoose.Schema({
    Course_Name: {
        type: String,
        required: true
    },
    Topics: [String]
});

const Course = module.exports = mongoose.model('Course', CourseSchema);

//--- Add New Course ----

module.exports.addCourse = function(newCourse,callback){
    newCourse.save(callback);
}

//--- Get All Course ----

module.exports.getAllCourse = function (callback) {
    
    Course.find({},['Course_Name','Topics'],callback);

    // Course.find({}).lean().exec().then((list)=>{
    //         //console.log(list.Course_Name)
    //         res.json(list)
    //     }).catch((err)=>
    //     {
    //         //res.send("error")
    //     });
}

// module.exports.getUserById = function (id, callback) {
//     User.findById(id, callback); 
// }

// module.exports.getCourseByName = function (name, callback) {
//     //const query = { "Course_Name": name };
//     Course.find({}, callback);
//     //Course.getCourseByName(query,callback);
// }

// module.exports.getCourseByName = function (name, callback) {
//     Course.find().lean().exec(function(err,docs){
    
//         // If there is an error, return the error and no results
//         if(err) 
//         return callback(err, null)

//         // No error, return the docs
//         callback(null, docs)
//     });
// }

// CourseSchema.statics.getCourseByName = function (name, callback) {
//     Course.find().lean().exec(function(err,docs){
    
//         // If there is an error, return the error and no results
//         if(err) 
//         return callback(err, null)

//         // No error, return the docs
//         callback(null, docs)
//     });
// }

// CourseSchema.statics.getCourseByName = function (callback) {
//     return this.find().lean().exec(callback);
//   }
// module.exports.getAllTasks = function(callback){ // we will pass a function :)
//     Task.find().lean().exec(function (err, docs) {
//     console.log(docs); // returns json
//     callback(docs); // <-- call the function passed as parameter
// });
// }

module.exports.getCourseByName = function(callback){
    // // we will pass a function
    // Course.find({}).exec(function(err,docs){
    //     console.log('call from models');
    //     console.log(docs);   // returns json
    //     callback(docs);   // <-- call the function passed as parameter
    // });

    // Person.find((err, people) => {  
    //     if (err) {
    //         // Note that this error doesn't mean nothing was found,
    //         // it means the database had an error while searching, hence the 500 status
    //         res.status(500).send(err)
    //     } else {
    //         // send the list of all people
    //         res.status(200).send(people);
    //     }
    // });

    Course.find((err,result)=>{
        if (err) {
            // Note that this error doesn't mean nothing was found,
            // it means the database had an error while searching, hence the 500 status
            //res.status(500).send(err)
        } else {
            console.log("Result : " + result);
            // send the list of all people
            //res.status(200).send(result);
        }
    });
}