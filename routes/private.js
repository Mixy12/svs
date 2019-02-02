var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");
const urlencodedParser = bodyParser.urlencoded({extended: false});
var sess;
router.post("/", urlencodedParser, function (request, response) {
  console.log(request.body);
  sess = request.session;
  console.log(sess);
  let login = request.body.login;
  let password = request.body.password;
  if(login=='mixy' && password=='lol'){
    sess.logged = true;
  response.render('cabinet',{
    title: 'Да здравствует ' + login
  });}
  else{
    response.render('login')
  }
});



/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.logged == true) {
    res.render('cabinet');
  }else{
    res.render('login');
  }
});

module.exports = router;
