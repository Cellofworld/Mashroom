
const express = require("express");
const mysql = require('mysql')
const app = express();
const session = require('express-session')
const flash = require('connect-flash')
const urlencodedParser = express.urlencoded({extended: false});


app.use(express.static(`${__dirname}/style`));
app.use(express.static(`${__dirname}/script`));
app.use(express.static(`${__dirname}/img`));
app.set("view engine", "hbs");
app.set("views", "view"); 



 
const pool = mysql.createPool({
    connectionLimit: 5,
    host: "localhost",
    user: "root",
    database: "test1",
    password: "newpass"
  });
   
  app.set("view engine", "hbs");
  
  // возвращаем форму для добавления данных
  app.get("/", function(req, res){
      res.render("main.hbs");
  });
  // получаем отправленные данные и добавляем их в БД 
  app.post("/", urlencodedParser, function (req, res) {
           
      if(!req.body) return res.sendStatus(400);
      const name = req.body.nameOrg;
      const weight = req.body.weight;
      pool.query("INSERT INTO users (nameOrg, weight) VALUES (?,?)", [name, weight], function(err, data) {
        if(err) return console.log(err);
        res.redirect("/");
      });
  });
  
  app.get("/login", function(req, res){
    res.render("login.hbs");
});

  app.post("/login", urlencodedParser, function (req, res) {
           
    if(!req.body) return res.sendStatus(400);
    const namea = req.body.userName;
    const weights = req.body.password;
    res.redirect("/login");

})

  app.get("/admin", function(req, res){
    pool.query("SELECT * FROM (SELECT * FROM users ORDER BY id DESC LIMIT 10) t ORDER BY id", function(err, data) {
      if(err) return console.log(err);
     
      res.render("admin.hbs", {
          users: data
      });
    });
});


app.listen(3000, function(){
  console.log("Сервер ожидает подключения...");
});