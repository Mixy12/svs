var express = require('express');
var router = express.Router();
var menucore = require('../public/functions/menucore');
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const soap = require('soap');
const md5 = require('md5');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
var sess;
router.post("/", urlencodedParser, function (request, response) {

  let login = request.body.login;
  let password = request.body.password;

  //----------------------------------------------

  var params = {
    UserName: login,
    UserPass: md5(password),
    UserIP:request.connection.remoteAddress.toString()
  };
  var args = {AutorizationXDTO:params};
  //console.log(args);

  soap.createClient(url, function(err, client) {
    client.SiteAutorization(args, function(err, result) {
      if(result == undefined){
        response.render('err', { logget: request.cookies.logged})
      }
      if(result.return == 'f'){
        response.render('err', { logget: request.cookies.logged})
      }
      var data = result.return;
      var j;
      //console.log(data);
      if(data == 'f'){
        j = data;
      } else{
       j = JSON.parse(data);
      }
      //console.log(j);

      if(j!='f'){
        response.cookie('logged', true);
        response.cookie('userId', j.UserId);
        response.cookie('hash', j.hash);
        response.cookie('alias', j.alias);
        response.cookie('pay', j.pay);
        response.render('index',{
          logget: 'true'
        });}
      else{
        response.render('login',{
          logget: request.cookies.logged
        })
      }

    });
  });


  //----------------------------------------------


});



/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.cookies.logged == true) {
    res.render('cabinet',{
      logget: req.cookies.logged
    });
  }else{
    console.log('req.cookie.logged');
    console.log(req.cookies.logged);
    res.render('login',{
      logget: req.cookies.logged
    });
  }
});

module.exports = router;
