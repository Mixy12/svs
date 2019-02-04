var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  if(req.session.logged == true){
    menu = 'Кабинет';
  }else{
    menu = 'Вход';
  }
  res.render('about', { menu: menu });
});

module.exports = router;
