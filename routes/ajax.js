const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const soap = require('soap');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
const urlencodedParser = bodyParser.urlencoded({extended: false});

router.post("/tracknum", urlencodedParser, function (request, response) {

  console.log(request.body);
  //if(!request.body) return response.sendStatus(400);
  //console.log(request.body);
  // response.send('sss');
  //var params = {"num":request.body.num};
  var args = {Num: request.body.num};

  soap.createClient(url, function(err, client) {
    client.History(args, function(err, result) {
      //if(err){response.render('err')}
      var data = result.return;

      var j = JSON.parse(data);
      if(j.result == 'ws_err11'){
        response.send('err');
      }else {
        //console.log(p1);
        //console.log(obj);
        //console.log(p1);
        response.send(j.table);
      } });
  });


});


router.post("/calculate", urlencodedParser, function (request, response) {
  if(request.session.hash){
    var hash = request.session.hash;
  } else {
    var hash = "";
  }


  if(request.session.userId){
    var userId = request.session.userId;
  } else {
    var userId = "";
  }
  var params = {
    "SendCity": request.body.sendCity,
    "RecCity": request.body.recdCity,
    "Wight": request.body.weight.toString(),
    "Volume": request.body.volume.toString(),
    "UserIP": request.connection.remoteAddress.toString(),
    "Hash":hash,
    "UserId":userId

    };
  var args = {CalcXDTO:params};
console.log(args);

  soap.createClient(url, function(err, client) {
    client.Calculation(args, function(err, result) {

      var data = result.return;
      if(data == 'Нет данных'){
        response.send('err');
      }else {
        var j = JSON.parse(data);
        //console.log(p1);
        //console.log(obj);
        //console.log(p1);
        response.send(j.data);
      } });
  });


});


//--------------заполнить из справочника----
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


  soap.createClient(url, function(err, client) {
    if(err){console.log(err)}
    client.SiteDispatch(args, function(err, result) {
      if(err){console.log(err)}
      var data = result.return;
      //console.log("data is "+ data);
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
//-----------------Добавить шаблон-----------------
router.post('/addTemp', function(req, res, next) {

  var params = {
    UserIP: req.connection.remoteAddress.toString(),
    Hash: req.session.hash,
    UserId: req.session.userId,
    name:req.body.tempName,
    Address:req.body.tempAdress,
    City:req.body.tempCity,
    AddInfo:req.body.tempAddInfo,
    Company :req.body.tempCompany,
    Person:req.body.tempPerson,
    Phone:req.body.tempPhone,
  };

  var paramsOne = JSON.stringify(params);

  var args = {Param:paramsOne};

  soap.createClient(url, function(err, client) {
    if (err){console.log("first err is " + err)}
    client.SrAddString(args, function(err, result) {
      if (err){console.log("second err is " + err)
        res.render('templates',{
          logget: req.session.logged})
      }else {
        var data = result.return;
        res.send(data);
        //-------------------------------------------
      }
    });
  });

});
//--------------------Удалить шаблон---------------------
router.post('/delTemp', function(req, res, next) {

  var params = {
    UserIP: req.connection.remoteAddress.toString(),
    Hash: req.session.hash,
    UserId: req.session.userId,
    name:req.body.name
  };

  var paramsOne = JSON.stringify(params);

  var args = {Param:paramsOne};

  soap.createClient(url, function(err, client) {
    if (err){console.log("first err is " + err)}
    client.SrDelString(args, function(err, result) {
      if (err){console.log("second err is " + err)
        res.render('templates',{
          logget: req.session.logged})
      }else {
        var data = result.return;
        res.send(data);
        //-------------------------------------------
      }
    });

  });

});