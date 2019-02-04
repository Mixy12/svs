var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.logged == true){
    menu = 'Кабинет';
  }else{
    menu = 'Вход';
  }
  res.render('track', { menu: menu });
});

module.exports = router;
