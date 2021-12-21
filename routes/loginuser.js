var express = require('express');
var router = express.Router();
const pool = require("../db")
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  
router.get('/', function(req, res, next) {

      
     
  res.render('loginuser');
  
  
});
router.post('/',  function(req, res, next) {
    
    let email=req.body.email
    let password=req.body.password
    localStorage.setItem('email', email);
     pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
          throw error
        }
        let check =false;
        console.log(check);
        results.rows.forEach((element)=>{
            console.log(element.email+element.password);
            if(element.email==email&&element.password==password){
                check=true;
                 }
        })
        
        console.log(check);
        
        if(check){
        res.redirect('/user');
         }
        else{
        res.send('yanlış')
        }
      })
  });

module.exports = router;
