const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("blog_db", "root", "$MySQL628$", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

////////////////      FOR CONNECT MYSQL DATABASE START     ////////////////
// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   database: "blog_db",
//   user: "root",
//   password: "$MySQL628$",
// });

// module.exports = pool.promise();
////////////////      FOR CONNECT MYSQL DATABASE END     ////////////////
