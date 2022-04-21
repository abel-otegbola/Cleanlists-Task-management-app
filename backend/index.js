const express = require("express");
const mysql = require("mysql");
const passport = require('passport');
const session = require('express-session');
const path = require('path')

const SQLiteStore = require('connect-sqlite3')(session);

const app = express();

//Bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

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
  
  //Create mysql database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE Fute';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result)
        console.log("db Created!");
    })
})

//Create mysql database table
app.get("/createTable", (req, res) => {
    let sql = 'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255), img VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send("Users table created")
    })
})

app.get("/createSpaces", (req, res) => {
  let sql = 'CREATE TABLE spaces(id int AUTO_INCREMENT, name VARCHAR(255), createdBy VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Spaces table created")
  })
})

app.get("/createTasks", (req, res) => {
  let sql = 'CREATE TABLE tasks(id int AUTO_INCREMENT, title VARCHAR(255), space VARCHAR(255), date VARCHAR(255), createdBy VARCHAR(255), deadline VARCHAR(255), priority VARCHAR(255), recurring VARCHAR(255), status VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
      if (err) throw err;
      res.send("Tasks table created")
  })
})

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: new SQLiteStore({ db: 'sessions.db', dir: './db' })
}));
app.use(passport.authenticate('session'));

// Routes
app.use("/api/user", require("./router/user"))
app.use("/api/spaces", require("./router/spaces"))
app.use("/api/tasks", require("./router/tasks"))



const PORT = process.env.PORT || '3007'

app.listen(PORT, "localhost", () => {
    console.log(`server started on port ${PORT}`)
})