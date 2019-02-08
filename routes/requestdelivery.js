var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const soap = require('soap');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
const urlencodedParser = bodyParser.urlencoded({extended: false});

var data;

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
        //.log("ParamsOne is"+paramsOne);

        var args = {Param:paramsOne};
        console.log(args);

            soap.createClient(url, function(err, client) {
                if(err){console.log(err)}
                client.SiteSrdirString(args, function(err, result) {
                    if(err){console.log(err)}
                    var data = result.return;
                    console.log("data "+data);
                     var j = JSON.parse(data);
                    //console.log(p1);
                    //console.log(obj);
                    //console.log(p1);
                    console.log(j.table);

                    res.render('requestdelivery',{
                        logget: req.session.logged,
                        table:j.table
                });
            });



 //------------------------------------------------------

        });
    }else{
        res.render('login',{
            logget: req.session.logged
        });
    }
        });
//------------------------------------------------------------

router.post("/", urlencodedParser, function (request, response) {

    var params = {
        "SendCity": request.body.SendCity,
        "SendAdress": request.body.SendAdress,
        "SendPhone": request.body.SendPhone,
        "SendPerson": request.body.SendPerson,
        "SendCompany": request.body.SendCompany,
        "SendAddInfo": request.body.SendAddInfo,
        "RecCity": request.body.RecCity,
        "RecAdress": request.body.RecAdress,
        "RecPhone": request.body.RecPhone,
        "RecPerson": request.body.RecPerson,
        "RecCompany": request.body.RecCompany,
        "RecAddInfo": request.body.RecAddInfo,
        "PayType": request.body.PayType,
        "DelType": request.body.DelType,
        "InsurValue": request.body.InsurValue,
        "COD": request.body.COD,
        "cargo": request.body.carg,

        "Date": request.body.curDate,
        "Time": request.body.curTime,
        "Uved": request.body.Uved,
        "Scan": request.body.Scan,
        "Opasn": request.body.Opasn,
        "Podp": request.body.Podp,
        "UserId": request.session.userId,
        "Hash": request.session.hash,
        "UserIP": request.connection.remoteAddress

    };
    console.log(params);
    console.log(request.body.carg);
    var paramsOne = JSON.stringify(params);
    var args = {Param:paramsOne};

    soap.createClient(url, function(err, client) {
        client.AddDispString(args, function(err, result) {
            var data = result.return;
            console.log(data);
            var j = JSON.parse(data);
            //console.log(p1);
            //console.log(obj);
            //console.log(p1);
            response.send(j.num);
        });
    });


});

module.exports = router;
