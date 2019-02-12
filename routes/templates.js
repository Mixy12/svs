var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const soap = require('soap');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
const urlencodedParser = bodyParser.urlencoded({extended: false});

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.logged == true) {
//-------------------------------------------------------------------------------

        var params = {
            "UserId": req.session.userId,
            "Hash": req.session.hash,
            "UserIP": req.connection.remoteAddress

        };
        var paramsOne = JSON.stringify(params);

        var args = {Param:paramsOne};
        console.log(args);

        soap.createClient(url, function(err, client) {
            if(err){console.log(err);
                res.render('templates',{
                    logget: req.session.logged})

            }else {
                client.SiteSrdirString(args, function (err, result) {
                    if (err) {
                        console.log(err)
                    }
                    var data = result.return;
                    console.log("data " + data);
                    var j = JSON.parse(data);
                    console.log(j.table);

                    res.render('templates', {
                        logget: req.session.logged,
                        table: j.table

                    });

                });
            }
            //------------------------------------------------------
        });
    }else{
        res.render('login',{
            logget: req.session.logged
        });
    }
});
module.exports = router;
