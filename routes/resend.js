var express = require('express');
var router = express.Router();
const email = require('emailjs');
const bodyParser = require("body-parser");

const server 	= email.server.connect({
  user:    "michailtonishevsergeevich1990@mail.ru",
  password:"a93606mjc",
  host:    "smtp.mail.ru",
  ssl:     true
});

router.post('/', function(req, res, next) {

  res.render('avia', { logget: req.session.logged});
  let reName = req.body.reName;
  let reEmail = req.body.reEmail;
  let rePhone = req.body.rePhone;
  let reCompany = req.body.reCompany;
  let reQuest = req.body.reQuest;


  server.send({
    text:    reName+'\r'+reEmail+'\r'+rePhone+'\r'+reCompany+'\r'+reQuest,
    from:    "<michailtonishevsergeevich1990@mail.ru>",
    to:      "<timofeev.i.v@mail.ru>",
    cc:      "<michailtonishevsergeevich1990@mail.ru>",
    subject: 'Обратная связь'
  }, function(err, message) { console.log(err || message); });
});

module.exports = router;
