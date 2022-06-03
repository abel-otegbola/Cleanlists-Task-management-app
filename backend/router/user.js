const express = require("express")
const mysql = require("mysql");
const bcrypt = require("bcryptjs")
var passport = require('passport');
var LocalStrategy = require('passport-local');
var flash = require("connect-flash")

const router = express.Router()
const app = express()

app.use(flash())

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
  
let msg = {}
  passport.use(new LocalStrategy(function verify(username, password, cb) {
            
            let findsql = `SELECT * FROM users WHERE name = '${username}'`;
            
            let query = db.query(findsql, (err, result) => {
                if (err) {
                    return cb(err)
                }
                if(result.length < 1) {
                    msg = { status: "fail", msg: "Username does not exist"}
                    return cb(null, false, { message: 'Username dont exist' });
                }
                else {
                    bcrypt.compare(password, result[0].password, (err, isMatch) => {
                        if(err) throw err;
        
                        if(isMatch) { 
                            msg = { status: "success", msg : ""}
                            return cb(null, username)
                        }
                        else {
                            msg = { status: "fail", msg: "Password is not correct"}
                            return cb(null, false, { message: 'Password Incorrect' });
                        }
                    })
                }
            })

  }));

let user = ""

router.get('/logout', function(req, res, next) {
    user= ""
    req.logout();
    res.redirect('/login');
});
//User Login
router.post("/loginhandler", 
    passport.authenticate('local', { 
        failureRedirect: '/login'
    }), 
    function(req, res) {
        user = req.user;
        res.redirect('/dashboard')
    }
);

function requireLogin(req, res, next) {
    if(!req.user) return res.redirect("/login");
    next();
}

router.get('/dashboard', requireLogin, function(req, res) {
    res.redirect('/dashboard')
})

router.get("/loginStatus", (req, res) => {
    res.json(msg)
})



passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, name: user.username });
    });
});
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
});

//Get user
router.get("/getUser", (req, res) => {
    res.send({user : user})
})

let regMsg = {}
router.post('/registerHandler', (req, res) => 
{//Hash password
     bcrypt.genSalt(10, (err, salt) => 
     bcrypt.hash(req.body.password, salt, (err, hash) => {
         if(err) throw err;
         hashedPassword = hash
         let newuser = {
                     name: req.body.name,
                     email: req.body.email,
                     password: hash,
                     img: ""
                 }
        let findemail = `SELECT * FROM users WHERE email = '${newuser.email}'`;

        let query = db.query(findemail, (err, result) => {
            if (err) {
                console.log(err)
            }
            if(result.length < 1) {

                let findname = `SELECT * FROM users WHERE name = '${newuser.name}'`;
                let query = db.query(findname, (err, result) => {
                    if (err) {
                        console.log(err)
                    }
                    if(result.length < 1) {
                        let sql = 'INSERT INTO users SET ?';
                        let query = db.query(sql, newuser, (err) => {
                            if (err) throw err;
                            msg = { status: "success", msg: "Registered! Please login in with username and password to continue" }
                            res.redirect("/login")
                    })}
                    else {
                        regMsg = { status: "fail", msg: "username already exists"}
                        res.redirect("/register")
                    }
                })

                
            }
            else {
                regMsg = { status: "fail", msg: 'Email already registered'}
                res.redirect("/register")
            }
        })
   })
   )
})
router.get("/registerStatus", (req, res) => {
    res.json(regMsg)
})
         
        



module.exports = router;