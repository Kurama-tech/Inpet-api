var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/liveness', function(req, res, next){
  res.send('API Live!').status(200);
});

module.exports = router;
