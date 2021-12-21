var express = require('express');
var router = express.Router();
const pool = require("../db")
router.get('/', function(req, res, next) {
  res.render('newuser');
});
router.post('/', async function(req, res, next) {
    let username=req.body.username
    let email=req.body.email
    let password=req.body.password

    pool.query('INSERT INTO users (username,email,password) VALUES ($1,$2,$3)', [username,email,password], (error, results) => {
        if (error) {
          throw error
        }
      })
  });




module.exports = router;
