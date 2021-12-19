var express = require('express');
var router = express.Router();
const pool = require("../db")

router.get('/', function(req, res, next) {
  res.render('login');
});
router.post('/', async function(req, res, next) {
    let email=req.body.email
    let password=req.body.password
    await pool.query('SELECT * FROM admin', (error, results) => {
        if (error) {
          throw error
        }
        if(results.rows[0].admin_name==email&&results.rows[0].password==password){
        res.status(200).send('aferin')
         }
        else{
        res.send('yanlış')
        }
      })
  });

module.exports = router;
