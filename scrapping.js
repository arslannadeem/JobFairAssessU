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

request('https://www.tutorialspoint.com/cplusplus/cpp_arrays.htm',function(err,resp,body){
    if(!err && resp.statusCode==200){
        var i=0;        
        var $ = cheerio.load(body);

        //------------------ SUB-TOPICS  ----------------

        // $("table > tbody > tr > td > a").each(function(){
        //     var topic_name = $(this).text();
        //     var topic_links = $(this).attr("href");
        //     console.log(topic_links);
        // });

        //------------------ SUB-HEADINGS --------------  

        // $("div > h2",".content").each(function(){
        //     var headings_name = $(this).text();
        //     console.log(headings_name);
        // });

        //------------------ SUB-HEADINGS --------------  

        $(".col-md-7").each(function(){
            var complete = $(this).children().addClass("checks");

            complete.each(function(){
                console.log($(this).get(0).tagName);
            })
        });
    }
});

// if($(this).is('h2'))
                // {
                //     console("HEADING")
                // }
                // else
                // {
                //     console.log("detail")
                // }

                // $('h2').each(function () {
                //     console.log($(this).nextAll("p,pre").text());
                //   });
            
            // var heading = $(this).find("p,pre").ea;
            // console.log(headings_details);