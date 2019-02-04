var express = require('express');
var menucore = require('../public/functions/menucore');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  sess = req.session;
  console.log(sess);
  var menusetting = menucore.menusetting(req.session.logged);
  /*if(req.session.logged == true){
    menu = 'Кабинет';
  }else{
    menu = 'Вход';
  }*/

  res.render('index', { menu: menusetting });
});

module.exports = router;
