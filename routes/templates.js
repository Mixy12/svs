var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const soap = require('soap');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
const urlencodedParser = bodyParser.urlencoded({extended: false});

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.cookies.logged == 'true') {
//-------------------------------------------------------------------------------

        var params = {
            "UserId": req.cookies.userId,
            "Hash": req.cookies.hash,
            "UserIP": req.connection.remoteAddress

        };
        var paramsOne = JSON.stringify(params);

        var args = {Param:paramsOne};
        console.log(args);

        soap.createClient(url, function(err, client) {
            if(err){console.log(err);
                res.render('templates',{
                    logget: req.cookies.logged})

            }else {
                client.SiteSrdirString(args, function (err, result) {
                    if(result == undefined){
                        res.render('err', { logget: req.cookies.logged})
                    }
                    if(result.return == 'ws_err'){
                        res.render('err', { logget: req.cookies.logged})
                    }
                    var data = result.return;
                    console.log("data " + data);
                    var j = JSON.parse(data);
                    console.log(j.table);

                    res.render('templates', {
                        logget: req.cookies.logged,
                        table: j.table

                    });

                });
            }
            //------------------------------------------------------
        });
    }else{
        res.render('login',{
            logget: req.cookies.logged
        });
    }
});
module.exports = router;
