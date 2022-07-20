const mysql = require("mysql2");
  
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test1",
    password: "newpass"
  });
   


  const users = [
    ["ООО Рога и копыта", 22],
    ["ООО Фуня и луня", 25],
    ["ООО Пончо", 28]
  ];
  const sql = `INSERT INTO users(nameOrg, weight) VALUES ?`;
   
  connection.query(sql, [users], function(err, results) {
      if(err) console.log(err);
      console.log(results);
  });
   
  connection.end();