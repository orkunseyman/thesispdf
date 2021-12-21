var express = require('express');
var router = express.Router();
const pool = require("../db")
const fs = require('fs');
const pdf = require('pdf-parse');
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
  
router.get('/', function(req, res, next) {
    console.log(localStorage.getItem('email'));
    res.render('dashboarduser');

  });

router.post('/',async function(req, res, next) {
    const pdfPath = "routes/" + req.body.fileb;
    parse_POD(pdfPath)
    .then(pdfData => {
        
        let array1 = pdfData.text.split('\n').filter(function(e) { return e !== ' '&&e!='' })
        let subject_name=array1[10]
        let project_name=array1[4]
        let author_name=array1[5]
        let advisor_name=array1[13]
        let jury_names=array1[17]+array1[21]
        let term_name

        if(array1[25].split('.')[1]<=2){
            term_name=array1[6].split(' ')[1]+' Güz dönemi'
        }else{
            term_name=array1[6].split(' ')[1]+' Bahar Dönemi'
        }
        console.log(localStorage.getItem('email')); 
        pool.query('INSERT INTO pdfs (author_name, subject,term,project_name,advisor_name,jury_names,email) VALUES ($1,$2,$3,$4,$5,$6,$7)', [author_name,subject_name,term_name,project_name,advisor_name,jury_names,localStorage.getItem('email')], (error, results) => {
            if (error) {
              throw error
            }
          })
        
    })
});




  function parse_POD(pdfPath, a_callbackSuccess, a_callbackFailed) {
    return new Promise((resolve, reject) => {
        var dataBuffer = fs.readFileSync(pdfPath);
        pdf(dataBuffer) 
            .then(data => {
          
                resolve(data)
            }).catch(err => {
                console.log("Error  ", err);
                reject(err);
            })
    })

}

module.exports = router;