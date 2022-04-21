const express = require("express")
const mysql = require("mysql");

const router = express.Router()
const app = express();

//Bodyparser
router.use(express.urlencoded({ extended: true }));


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

router.post('/createTask', function(req, res) {
    let sql = 'INSERT INTO tasks SET ?';
    let query = db.query(sql, req.body, (err) => {
        if (err) throw err;
        res.redirect("/tasks")
    })
});

router.get('/getTasks', (req, res) => {
    let sql = 'SELECT * FROM tasks';
    let query = db.query(sql, (err, result) => {
        res.send(result)
    })
})
router.post('/changeStatus', (req, res) => {
    let sql = `UPDATE tasks SET ${req.body.para} = "${req.body.change}" WHERE id = ${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        res.send(result)
    })
})
router.post('/findToday', (req, res) => {
    let sql = `SELECT * FROM tasks`;
    let query = db.query(sql, (err, result) => {
        res.send(result)
    })
})
router.post('/deadlineCount', (req, res) => {
    let sql = `UPDATE tasks SET deadline = "${req.body.deadline}" WHERE id = ${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        res.send(result)
    })
})
router.post('/deleteTask', (req, res) => {
    let sql = `DELETE FROM tasks WHERE id = ${req.body.id}`;
    let query = db.query(sql, (err, result) => {
        res.send(result)
    })
})



module.exports = router;