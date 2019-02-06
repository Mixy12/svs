const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const soap = require('soap');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post("/tracknum", urlencodedParser, function (request, response) {
  //console.log('aaaa');
  console.log(request.body);
  //if(!request.body) return response.sendStatus(400);
  //console.log(request.body);
  // response.send('sss');
  //var params = {"num":request.body.num};
  var args = {Num: request.body.num};

  soap.createClient(url, function(err, client) {
    client.History(args, function(err, result) {
      var data = result.return;

      var j = JSON.parse(data);
      //console.log(p1);
      //console.log(obj);
      //console.log(p1);
      response.send(j.table);
    });
  });


});


router.post("/calculate", urlencodedParser, function (request, response) {
  var params = {
    "SendCity": request.body.sendCity,
    "RecCity": request.body.recdCity,
    "Wight": request.body.weight.toString(),
    "Volume": request.body.volume.toString(),
    "UserIP": request.connection.remoteAddress.toString(),
    "Hash":"",
    "UserId":""

    };
  var args = {CalcXDTO:params};
console.log(args);

  soap.createClient(url, function(err, client) {
    client.Calculation(args, function(err, result) {
      var data = result.return;
      console.log(data);
      var j = JSON.parse(data);
      //console.log(p1);
      //console.log(obj);
      //console.log(p1);
      response.send(j.data);
    });
  });


});

router.post("/calculate", urlencodedParser, function (request, response) {
  var params = {
    "SendCity": request.body.sendCity,
    "RecCity": request.body.recdCity,
    "Wight": request.body.weight.toString(),
    "Volume": request.body.volume.toString(),
    "UserIP": request.connection.remoteAddress.toString(),
    "Hash":"",
    "UserId":""

  };
  var args = {CalcXDTO:params};
  console.log(args);

  soap.createClient(url, function(err, client) {
    client.Calculation(args, function(err, result) {
      var data = result.return;
      console.log(data);
      var j = JSON.parse(data);
      //console.log(p1);
      //console.log(obj);
      //console.log(p1);
      response.send(j.data);
    });
  });


});


router.post("/reqdel", urlencodedParser, function (request, response) {
  var params = {
    "UserId": request.session.userId,
    "Hash": request.session.hash,
    "UserIP": request.connection.remoteAddress

  };
  var args = {LoginXDTO:params};
  //console.log(args);

  soap.createClient(url, function(err, client) {
    client.SiteSrdir(args, function(err, result) {
      var data = result.return;
      console.log("data "+data);
      var j = JSON.parse(data);
      //console.log(p1);
      //console.log(obj);
      //console.log(p1);
      response.send(j.table);
      console.log("Таблица"+j.table);
    });
  });


});

module.exports = router;

//-----------------------------------------
router.post("/finddisp", urlencodedParser, function (request, response) {
  var params = {
    "UserIP": request.connection.remoteAddress,
    "Hash": request.session.hash,
    "UserId": request.session.userId,
    "from": request.body.from.toString(),
    "to": request.body.to.toString()
  };
  var args = {LoginXDTO:params};
  //console.log(args);

  soap.createClient(url, function(err, client) {
    client.SiteDispatch(args, function(err, result) {
      var data = result.return;
      //console.log(data);
      var j = JSON.parse(data);
      //console.log(p1);
      //console.log(obj);
      //console.log(p1);
      response.send(j.table);
    });
  });


});

router.post("/disp", urlencodedParser, function (request, response) {



});