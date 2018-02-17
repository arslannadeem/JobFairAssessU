var request = require('request'),
    cheerio = require('cheerio');

// request('http://www.cplusplus.com/doc/tutorial/arrays/',function(err,resp,body){
//     if(!err && resp.statusCode==200){
//         var $ = cheerio.load(body);
//         //data = $("div:has(section)").val();
//         var i=0;

//         $('div > section').each(function(){
//             var topic_name = $(this).attr("id");
//             var topic_detail = $(this).text();
//             console.log(topic_detail);
//         });
//     }
// });

// request('https://www.tutorialspoint.com/cplusplus/cpp_arrays.htm',function(err,resp,body){
//     if(!err && resp.statusCode==200){
//         var i=0;        
//         var $ = cheerio.load(body);

//         //------------------ SUB-TOPICS  ----------------

//         // $("table > tbody > tr > td > a").each(function(){
//         //     var topic_name = $(this).text();
//         //     var topic_links = $(this).attr("href");
//         //     console.log(topic_links);
//         // });

//         //------------------ SUB-HEADINGS --------------  

//         // $("div > h2",".content").each(function(){
//         //     var headings_name = $(this).text();
//         //     console.log(headings_name);
//         // });

//         //------------------ SUB-HEADINGS --------------  

//         $(".col-md-7").each(function(){
//             var complete = $(this).children().addClass("checks");

//             complete.each(function(){
//                 if(($(this).get(0).tagName)!="h2")
//                 {
//                    console.log( $(this).html());
//                 }
//             })
//         });
//     }
// });


// var items = [];
// var combine_data = [];

// //------------------------  TOPICS OF JAVATPOINT -----------------

// request('https://www.javatpoint.com/cpp-tutorial', function (err, resp, body) {
//     if (!err && resp.statusCode == 200) {
//         var i = 0;
//         var $ = cheerio.load(body);

//         //-------------------- TOPICS -------------------

//         $("#menu").each(function () {
//             var complete = $(this).children();
//             var i = 0;
//             complete.each(function () {
//                 var topic_name = $(this).attr("class");
//                 var check2;
//                 if (topic_name == "leftmenu2") {
//                     //"-------------- HEADINGS ------------";
//                     check2 = $(this).text();
//                 }
//                 else if (topic_name == "leftmenu") {
//                     //"-------------- SUB HEADING------------";
//                     var subheadings = $(this).children();
//                     subheadings.each(function () {
//                         if ($(this).attr("href") != null)
//                             items.push($(this).attr("href"), $(this).text(), check2);
//                     });
//                     combine_data.push(check2, items);
//                 }
//                 items = [];
//             });
//         });
//     }
// });

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



////////////------------------------


var items = [];
var combine_data = [];

var request = require('request'),
    cheerio = require('cheerio');


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
                        items.push(subtopics, urlss, heading);

                    }

                }

            })
        });

        for (j = 0; j < items.length; j++) {
            console.log(items[j]);
        }
    }
});