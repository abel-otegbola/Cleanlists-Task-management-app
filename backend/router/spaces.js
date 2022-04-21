const express = require("express")
const mysql = require("mysql");

const router = express.Router()

//Create mysql database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "Abel",
    password: "1234",
    database: "Fute"
  });
  
  db.connect(function(err) {
    if (err) throw err;
    console.log("db Connected!");
  });

router.post('/createSpace', function(req, res) {
    let sql = 'INSERT INTO spaces SET ?';
    let query = db.query(sql, req.body, (err) => {
        if (err) throw err;
        res.redirect("/spaces")
    })
});

router.get('/getSpaces', (req, res) => {
    let sql = 'SELECT * FROM spaces';
    let query = db.query(sql, (err, result) => {
        res.send(result)
    })
})



module.exports = router;