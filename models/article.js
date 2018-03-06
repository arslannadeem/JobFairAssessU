const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Article Schema

const ArticlesSchema = mongoose.Schema({
    _id: { type: Number, auto: true },
    Article_Heading: { type: String, required: true },
    Description: { type: String, required: true },
    Article_Level: [{ type: String, required: true }],
    Topic_Name: { type: String, required: true },
    Sub_Topic_Name: { type: String, required: true }
}, { _id: false });

const Article = module.exports = mongoose.model('Article', ArticlesSchema);

//--- Add New Article ----

module.exports.addArticle = function (newArticle, callback) {

    var temp_level = [];

    for (var i = 0; i < newArticle.Level.length; i++) {
        temp_level[i] = newArticle.Level[i].itemName;
    }

    var temp_sub_heading = [];

    for (var i = 0; i < newArticle.Heading.length; i++) {
        temp_sub_heading[i] = newArticle.Heading[i].itemName;
    }

    var temp_sub_heading_id = [];

    for (var i = 0; i < newArticle.Heading.length; i++) {
        temp_sub_heading_id[i] = newArticle.Heading[i].id;
    }

    var size = newArticle.Heading.length;
    var id;

    Article.count({}, function (err, count) {
        if (!count > 0) {
            id = 1;
        }
        else {
            id = ++count;
        }

        var list_of_article = [];

        for (var j = 0; j < temp_sub_heading.length; j++) {

            let obj_article = new Article({
                _id: id + j,
                Article_Heading: temp_sub_heading[j],
                Description: newArticle.Head[temp_sub_heading_id[j]] + newArticle.Para[temp_sub_heading_id[j]],
                Article_Level: temp_level,
                Topic_Name: newArticle.Topics[0].itemName.replace(/^"(.*)"$/, '$1'),
                Sub_Topic_Name: newArticle.Sub_Topic_Heading[temp_sub_heading_id[j]]
            });
            list_of_article[j] = obj_article;
        }
        Article.insertMany(list_of_article, callback);
    });
}

// -------------- 

module.exports.ArticleResult = function (newArticle, callback) {

    temp_topics = [];
    temp_sub_topics = [];
    temp_level = [];

    for(var i=0;i<newArticle.length;i++)
    {
        this.temp_level[i] = newArticle[i].Level;
        this.temp_topics[i] = newArticle[i].Topic_Name;
        this.temp_sub_topics[i] = newArticle[i].Level;
    }

    console.log(req.body.data);

    let Article_data = {
        "Topics": tempTopics, "Level": temp_Level, "Sub_Topics" : tempSubTopics
    };

    // "Topics" : tempTopics, "Level": temp_Level, "Sub_Topics" : tempSubTopics

    var temp_level = [];

    for (var i = 0; i < newArticle.Level.length; i++) {
        temp_level[i] = newArticle.Level[i].itemName;
    }

}