var express = require('express');
var router = express.Router();
const pool = require("../db")

router.get('/', function(req, res, next) {
    res.render('searchpdfuser');
  });
router.post('/',async function(req, res, next) {
    let authorname=req.body.authorname
    let subject=req.body.subject
    let projectname=req.body.projectname
    let term=req.body.term
    
    if(authorname!=''){
        pool.query("SELECT project_name,subject,author_name,term,advisor_name,jury_names FROM pdfs WHERE email=$1 AND author_name LIKE upper('%' || $2 || '%') ",[localStorage.getItem('email'),authorname], (error, results) => {
            console.log(results.rows);
            console.log(localStorage.getItem('email'));
            if (error) {
              throw error
            }
            res.render('pdfresult',{
                results:results.rows
            })
          })
    }else if(subject!=''){
        pool.query("SELECT project_name,subject,author_name,term,advisor_name,jury_names FROM pdfs WHERE  email=$1 AND subject LIKE upper('%' || $2 || '%')",[localStorage.getItem('email'),subject], (error, results) => {
            if (error) {
              throw error
            }
            
            res.render('pdfresult',{
                results:results.rows
            
            })
          })
    }else if(projectname!=''){
            console.log(localStorage.getItem('email'));
            pool.query("SELECT project_name,subject,author_name,term,advisor_name,jury_names FROM pdfs WHERE  email=$1 AND project_name LIKE upper('%' || $2 || '%')",[localStorage.getItem('email'),projectname], (error, results) => {
            if (error) {
              throw error
            }
            
            res.render('pdfresult',{
                results:results.rows
            
            })
          })
    }else if(term!=''){
        pool.query("SELECT project_name,subject,author_name,term,advisor_name,jury_names FROM pdfs WHERE  email=$1 AND term LIKE upper('%' || $2 || '%')",[localStorage.getItem('email'),term], (error, results) => {
            if (error) {
              throw error
            }
            res.render('pdfresult',{
                results:results.rows
            
            })
          })
    }
    
})

module.exports = router;