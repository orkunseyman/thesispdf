var express = require('express');
var router = express.Router();
const pool = require("../db")

router.get('/', function(req, res, next) {
  res.redirect('/login');
});



module.exports = router;
