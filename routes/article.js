const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

// --------------------  Add New Course  -----------------------

router.post('/newArticle',(req,res,next)=>{

    let newArticle = new Article({
        _id : 1,
        Article_Heading : 'What is this',
        Description : 'sdfsdfsdfnskdnfskdfnsdnfksdf',
        Article_Level : 'easy',
        Topic_Name : 'Pointer',
        Sub_Topic_Name : 'Null Pointer'
    });

    console.log("router article");
    Article.addArticle(newArticle,(err,article)=>{
        if(err)
        {
            res.json({success : false,msg : 'Failed to Add New Article'});
        }
        else
        {
            res.json({success : true,msg : 'Article Added'});
        }
    });
});

module.exports=router;