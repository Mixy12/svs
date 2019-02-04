var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
const soap = require('soap');
const md5 = require('md5');
const url = 'http://82.200.49.118/cs/maws.1cws?wsdl';
var sess;
router.post("/", urlencodedParser, function (request, response) {
  sess = request.session;

  let login = request.body.login;
  let password = request.body.password;

  //----------------------------------------------

  var params = {
    UserName: login,
    UserPass: md5(password),
    UserIP:request.connection.remoteAddress.toString()
  };
  var args = {AutorizationXDTO:params};
  console.log(args);

  soap.createClient(url, function(err, client) {
    client.SiteAutorization(args, function(err, result) {
      var data = result.return;
      var j;
      //console.log(data);
      if(data == 'f'){
        j = data;
      } else{
       j = JSON.parse(data);
      }
      console.log(j);

      if(j!='f'){
        sess.logged = true;
        sess.userId = j.UserId;
        sess.hash = j.hash;
        sess.alias = j.alias;
        console.log(sess);
        response.render('cabinet',{
          menu: 'Кабинет'
        });}
      else{
        response.render('login',{
          menu: 'Вход'
        })
      }

    });
  });


  //----------------------------------------------


});



/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.logged == true) {
    res.render('cabinet',{
      menu: 'Кабинет'
    });
  }else{
    res.render('login',{
      menu: 'Вход'
    });
  }
});

module.exports = router;
