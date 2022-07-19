var mysql  = require('mysql');
const fs = require('fs');
const path = require('path');


const db= mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '123456',
    database : 'apiserver'
  });
db.connect()
module.exports=db