const express = require('express');
const router = express.Router();
const passport = require('passport');
var jwt = require('jsonwebtoken');
const config = require('../config/database');

var request = require('request'),
    cheerio = require('cheerio');

router.get('/Add_Topics', (req, res, next) => {

    var check2;
    var items = [];
    var combine_data = [];
    var items2 = [];

    //------------------------  TOPICS OF JAVATPOINT -----------------

    request('https://www.javatpoint.com/cpp-tutorial', function (err, resp, body) {
        if (!err && resp.statusCode == 200) {
            var i = 0;
            var $ = cheerio.load(body);

            //-------------------- TOPICS -------------------

            $("#menu").each(function () {
                var complete = $(this).children();
                var i = 0;
                complete.each(function () {
                    var topic_name = $(this).attr("class");
                    if (topic_name == "leftmenu2") {
                        //"-------------- HEADINGS ------------";
                        check2 = $(this).text();
                    }
                    else if (topic_name == "leftmenu") {
                        //"-------------- SUB HEADING------------";
                        var subheadings = $(this).children();
                        subheadings.each(function () {
                            if ($(this).attr("href") != null) {
                                var url = "https://www.javatpoint.com/" + $(this).attr("href");
                                items.push(url, $(this).text(), check2);
                            }
                        });
                        combine_data.push(check2, items);
                        check2 = null;
                    }
                    items = [];
                });
            });
        }
        if (!combine_data) {
            return res.json({ success: false, msg: ' Topics not found' });
        }
        var return_obj = { 'success': true, 'data': combine_data };
        return res.json(return_obj);
    });
});

//------------------------  TOPICS OF TUTORIAL POINT -----------------

router.get('/Add_Topics2', (req, res, next) => {

    var items2 = [];

    request('https://www.tutorialspoint.com/cplusplus/cpp_arrays.htm', function (err, resp, html) {

        if (!err && resp.statusCode == 200) {

            var complete = html.toString();
            var i = 0;
            var $ = cheerio.load(html);

            var Headlines = [];
            var stringuse = "";

            $(".sidebar").each(function () {
                var complete = $(this).children().addClass("checks");
                //console.log(complete.next().text());
                // console.log(complete);
                complete.each(function () {
                    //    console.log($(this).get(0).tagName);
                    if ($(this).get(0).tagName == "ul") {
                        var heading = "";

                        if ($(this).attr('class') == "nav nav-list primary left-menu checks") {

                            var nextchild = $(this).children();
                            // console.log(nextchild.get(0).tagName);
                            if (nextchild.attr('class') == "heading") {
                                heading = $(this).text();
                                //    console.log(heading);
                                var value = "";

                                for (i = 1; i < heading.length; i++) {
                                    value = value + heading[i];
                                    if (heading[i] == '\n') {
                                        i = heading.length;
                                    }
                                }

                                //  console.log("Topics "+value);

                                var subtopics = [];
                                var Headlines = heading.split('\n');
                                for (i = 2; i < Headlines.length; i++) {
                                    // console.log(Headlines[i]);
                                    if (!Headlines[i].includes('Home') && !Headlines[i] == '') {
                                        //console.log("Subtopics "+Headlines[i]);
                                        subtopics.push(Headlines[i]);
                                    }
                                } heading = value;

                            }

                            var child = $(this).children().children();
                            var urlss = [];
                            child.each(function () {
                                var data = ($(this).attr("href"));

                                if (!data.includes('index')) {
                                    urlss.push("https://www.tutorialspoint.com" + data);
                                }
                            })
                            items2.push(subtopics, urlss, heading);
                        }
                    }

                })
            });

            // for (j = 0; j < items2.length; j++) {
            //     console.log(items2[j]);
            // }
        }
        if (!items2) {
            return res.json({ success: false, msg: ' Topics not found' });
        }
        var return_obj = { 'success': true, 'data': items2 };
        return res.json(return_obj);
    });
});


// //------------------------  TOPICS OF JAVATPOINT -----------------

// request('https://www.javatpoint.com/cpp-tutorial', function (err, resp, body) {
//     if (!err && resp.statusCode == 200) {
//         var i = 0;
//         var $ = cheerio.load(body);

//         //-------------------- TOPICS -------------------

//         $("#menu").each(function () {
//             var complete = $(this).children();
//             complete.each(function () {
//                 var topic_name = $(this).attr("class");
//                 var check2;
//                 if(topic_name=="leftmenu2"){
//                     console.log("--------------HEADING------------")
//                     check2 = $(this).text();
//                     console.log(check2);
//                 }
//                 else if(topic_name=="leftmenu"){
//                     console.log("-------------- SUB HEADING------------")
//                     var sub = $(this).html();       // --- with links
//                     // console.log(sub);

//                     var subheadings = $(this).children();   // --- without links
//                     subheadings.each(function(){
//                         console.log($(this).html());
//                     });
//                 }

//             });

//             //------------------ SUB-TOPICS  ----------------

//             // $("table > tbody > tr > td > a").each(function(){
//             //     var topic_name = $(this).text();
//             //     var topic_links = $(this).attr("href");
//             //     console.log(topic_links);
//             // });

//             //------------------ SUB-HEADINGS --------------  

//             // $("div > h2",".content").each(function(){
//             //     var headings_name = $(this).text();
//             //     console.log(headings_name);
//             // });

//             //------------------ SUB-HEADINGS --------------  

//             // $(".col-md-7").each(function () {
//             //     var complete = $(this).children().addClass("checks");

//             //     complete.each(function () {
//             //         if (($(this).get(0).tagName) != "h2") {
//             //             console.log($(this).html());
//             //         }
//             //     })
//             // });
//         });
//     }
// });


//------------------------  ARTICLES OF TUTORIAL POINT -----------------

router.get('/Articles', (req, res, next) => {

    var data = [];

    request('https://www.tutorialspoint.com/object_oriented_analysis_design/ooad_uml_structural_diagrams.htm', function (err, resp, html) {

        if (!err && resp.statusCode == 200) {
            var $ = cheerio.load(html);
            //    console.log(html);
            var Headlines = [];
            var parah = [];

            $(".col-md-7").each(function () {

                var complete = $(this).children().addClass("checks");
                var Paragraph = "";

                (complete).each(function () {
                    //    console.log($(this).get(0).tagName);
                    if ($(this).get(0).tagName !== "h2") {
                        //
                        //console.log('-----------');
                        //console.log($(this).nextAll().html());
                        //      if ($(this).get(0).tagName=="img")

                        if ($(this).get(0).tagName == "p") {
                            // console.log($(this).text());

                            Paragraph = Paragraph + "<" + $(this).get(0).tagName + ">" + $(this).text() + "</" + $(this).get(0).tagName + ">"
                        }
                        else if ($(this).get(0).tagName == "pre") {
                            Paragraph = Paragraph + "<pre class = 'result notranslate'>" + $(this).text() + "</pre>";
                        }
                        else if ($(this).get(0).tagName == "img") {
                            //console.log($(this).text());
                            //console.log("https://www.tutorialspoint.com"+$(this).get(0).attribs.src);
                            //console.log($(this).get(0).attribs.alt);
                            Paragraph = Paragraph + "<img src = " + "https://www.tutorialspoint.com" + $(this).get(0).attribs.src + " " + "alt = " + $(this).get(0).attribs.alt + ">";
                        }
                        //console.log(Paragraph);

                    }
                    else {

                        //stringuse="";
                        // console.log($(this).html());
                        Headlines.push("<" + $(this).get(0).tagName + ">" + $(this).text() + "</" + $(this).get(0).tagName + ">");
                        if (Paragraph.length > 1) {
                            parah.push(Paragraph);
                        }
                        Paragraph = "";

                    }

                })
            });
            for (j=0;j<parah.length;j++)
            {
                //console.log(Headlines[j]+parah[j]);
                data[j]=(Headlines[j],parah[j]);
            }

            if (!data) {
                return res.json({ success: false, msg: ' Articles not found' });
            }
            var return_obj = { 'success': true, 'data': data };
            return res.json(return_obj);
        }
    });
});

module.exports = router;