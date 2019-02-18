var express = require('express');
var router = express.Router();
const htmlPdf = require('html-pdf');
const soap = require('soap');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';

router.get('/:num', function(req, res, next) {
    if(req.session.logged == true) {
        var params = {
            UserIP: req.connection.remoteAddress.toString(),
            Hash: req.session.hash,
            UserId: req.session.userId,
            num: req.params.num.toString()
        };
    }else{
        var params = {
            "UserId": '100000171',
            "Hash": 'ewfffffffffwe',
            "UserIP": req.connection.remoteAddress,
            num: req.params.num.toString()
        };
    }
    var paramsOne = JSON.stringify(params);
    //.log("ParamsOne is"+paramsOne);

    var args = {param1:paramsOne};
    //console.log(args);

    soap.createClient(url, function(err, client) {
        if (err){console.log("first err is " + err)};
        client.test1(args, function(err, result) {
            if (err){console.log("second err is " + err)};
            if(result == undefined){
                res.render('err', { logget: req.session.logged})
            }
            if(result.return == 'ws_err'){
                res.render('err', { logget: req.session.logged})
            }
            //console.log("result is " + result);
            var data = result.return;
            //console.log("data is " + data);
            var j = JSON.parse(data);
            console.log(j);
            //var k = JSON.parse(j.val);
            //--------------------------------------------
            res.render("pdfdisp",{num:j,params:params.num})
            //-------------------------------------------

        });
    });

});

module.exports = router;
