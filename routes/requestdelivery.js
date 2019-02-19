var express = require('express');
var router = express.Router();
const email = require('emailjs');
const bodyParser = require("body-parser");
const soap = require('soap');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
const urlencodedParser = bodyParser.urlencoded({extended: false});

var data;

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.session.logged == true) {
        let content;
//-------------------------------------------------------------------------------
            let params = {
                "UserId": req.session.userId,
                "Hash": req.session.hash,
                "UserIP": req.connection.remoteAddress

            };
        let paramsOne = JSON.stringify(params);
        //.log("ParamsOne is"+paramsOne);

        let args = {Param:paramsOne};
        console.log(args);

            soap.createClient(url, function(err, client) {
                if(err){console.log(err)}
                client.SiteSrdirString(args, function(err, result) {
                    if(err){
                        res.render('err', { logget: req.session.logged})
                    }
                    if(result == undefined){
                        res.render('err', { logget: req.session.logged})
                    }

                    if(result.return == 'ws_err' ){
                        res.render('err', { logget: req.session.logged})
                    }
                    if(err){console.log(err)}
                    let data = result.return;
                    console.log("data "+data);
                     let j = JSON.parse(data);
                    //console.log(p1);
                    //console.log(obj);
                    //console.log(p1);
                    console.log(j.table);
                    //------------------------------------------------
                    if(req.query.copy){
                        let params = {
                            UserIP: req.connection.remoteAddress.toString(),
                            Hash: req.session.hash,
                            UserId: req.session.userId,
                            num: req.query.copy.toString()
                        };
                        console.log('params');
                        console.log(params);
                        console.log('params');
                        let paramsOne = JSON.stringify(params);
                        //.log("ParamsOne is"+paramsOne);

                        let args = {param1:paramsOne};
                        //console.log(args);

                        soap.createClient(url, function(err, client) {
                            if (err){console.log("first err is " + err)};
                            client.test1(args, function(err, result) {
                                if (err){console.log("second err is " + err)
                                    res.render('err', { logget: req.session.logged})
                                };
                                if(result === undefined){
                                    res.render('err', { logget: req.session.logged})
                                }
                                if(result.return == 'ws_err'){
                                    res.render('err', { logget: req.session.logged})
                                }
                                //console.log("result is " + result);
                                let data = result.return;
                                //console.log("data is " + data);
                                 content = JSON.parse(data);
                                res.render('requestdelivery',{
                                    logget: req.session.logged,
                                    table:j.table,
                                    content:content
                            });
                        });

                    })} else {
                        content = '';

                            res.render('requestdelivery',{
                                logget: req.session.logged,
                                table:j.table,
                                content:content
                        })}
                    //------------------------------------------------


                    })



 //------------------------------------------------------

        });
    }else{
        let content = '';
        res.render('requestdelivery',{
            logget: req.session.logged,
            content:content
        });
    }
        });
//------------------------------------------------------------
router.get('/:num', function(req, res, next) {

    let params = {
        UserIP: req.connection.remoteAddress.toString(),
        Hash: req.session.hash,
        UserId: req.session.userId,
        num: req.params.num.toString()
    };
    let paramsOne = JSON.stringify(params);
    //.log("ParamsOne is"+paramsOne);
    let args = {param1:paramsOne};
    //console.log(args);

    soap.createClient(url, function(err, client) {
        if (err){console.log("first err is " + err)};
        client.test1(args, function(err, result) {
            if(result == undefined){
                res.render('err', { logget: req.session.logged})
            }
            if(result.return == 'ws_err'){
                res.render('err', { logget: req.session.logged})
            }
            if (err){console.log("second err is " + err)};

            //console.log("result is " + result);
            var data = result.return;
            //console.log("data is " + data);
            var j = JSON.parse(data);
            console.log(j);
            //var k = JSON.parse(j.val);
            res.render('requestdelivery', { num: j,logget: req.session.logged});
        });
    });

});
//------------------------------------------------------------
router.post("/", urlencodedParser, function (request, response) {

    const server 	= email.server.connect({
        user:    "info-svs-logistic@mail.ru",
        password:"svs-logisticpass",
        host:    "smtp.mail.ru",
        ssl:     true
    });

    if(request.session.logged == true) {
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
    }else{
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
            "UserId": '100000171',
            "Hash": '',
            "UserIP": request.connection.remoteAddress

        };
    }
    console.log("params");
    console.log(params);
    var paramsOne = JSON.stringify(params);
    var args = {Param:paramsOne};

    soap.createClient(url, function(err, client) {
        if(err){console.log(err)}
        client.AddDispString(args, function(err, result) {
            if(result == undefined){
                res.render('err', { logget: request.session.logged})
            }
            if(result.return == 'ws_err'){
                res.render('err', { logget: request.session.logged})
            }
            if(err){console.log(err)}
            var data = result.return;
            console.log(data);
            var j = JSON.parse(data);
            //console.log(p1);
            //console.log(obj);
            //console.log(p1);
            response.send(j.num);
            server.send({
                text:    'Номер накладной: '+j.num+'\r'+'Город отправителя: '+params.SendCity+'\r'+'Адрес отправителя: '+params.SendAdress,
                from:    "<info-svs-logistic@mail.ru>",
                to:      "<info@svs-logistik.ru>, <adm@svs-logistik.ru>, <svs-logistiknsk@mail.ru>",

                subject: 'Новая накладная'
            }, function(err, message) { console.log(err || message); });
        });
    });


});

module.exports = router;
