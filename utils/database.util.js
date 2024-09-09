////////////////      FOR CONNECT MONGODB DATABASE END     ////////////////
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;

const connectMongoDB = (callback) => {
  MongoClient.connect("")
    .then((client) => {
      console.log("MongoDB Connected");
      _db = client.db();
      callback();
    })
    .catch((error) => {
      console.log("MongoDB Connection Error:", error);
      throw error;
    });
};

const getDB = () => {
  if (_db) {
    return _db;
  }
  throw "No Database Found.";
};

exports.connectMongoDB = connectMongoDB;
exports.getDB = getDB;
////////////////      FOR CONNECT MONGODB DATABASE END     ////////////////

////////////////      FOR CONNECT SEQUELIZE DATABASE START     ////////////////
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("blog_db", "root", "$MySQL628$", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;
////////////////      FOR CONNECT SEQUELIZE DATABASE END     ////////////////

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
