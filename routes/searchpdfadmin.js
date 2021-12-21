var express = require('express');
var router = express.Router();
const pool = require("../db")

router.get('/', function(req, res, next) {
    res.render('searchpdf');
  });
router.post('/',async function(req, res, next) {
    let authorname=req.body.authorname
    let subject=req.body.subject
    let projectname=req.body.projectname
    let term=req.body.term

    let subject2=req.body.subject2
    let authorname2=req.body.authorname2
    let term2=req.body.term2
    console.log(term2+authorname2+subject2);
    // if(authorname2!=''&&subject2!=''&&term2!=''){
    //     pool.query("SELECT project_name,subject,author_name,term,advisor_name,jury_names FROM pdfs WHERE author_name=$1 AND term=$2  AND subject=$3",[authorname2,term2,subject2], (error, results) => {
    //         if (error) {
    //           throw error
    //         }
    //         console.log(results.row);
    //         res.render('pdfresult',{
    //             results:results.rows

    //         })
    //       })
    // }
    if(authorname!=''){
        pool.query("SELECT project_name,subject,author_name,term,advisor_name,jury_names FROM pdfs WHERE author_name LIKE upper('%' || $1 || '%')",[authorname], (error, results) => {
            if (error) {
              throw error
            }
            res.render('pdfresult',{
                results:results.rows

            })
          })
    }else if(subject!=''){
        pool.query("SELECT project_name,subject,author_name,term,advisor_name,jury_names FROM pdfs WHERE subject LIKE upper('%' || $1 || '%')",[subject], (error, results) => {
            if (error) {
              throw error
            }

            res.render('pdfresult',{
                results:results.rows

            })
          })
    }else if(projectname!=''){
            pool.query("SELECT project_name,subject,author_name,term,advisor_name,jury_names FROM pdfs WHERE project_name LIKE upper('%' || $1 || '%')",[projectname], (error, results) => {
            if (error) {
              throw error
            }

            res.render('pdfresult',{
                results:results.rows

            })
          })
    }else if(term!=''){
        pool.query("SELECT project_name,subject,author_name,term,advisor_name,jury_names FROM pdfs WHERE term LIKE upper('%' || $1 || '%')",[term], (error, results) => {
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