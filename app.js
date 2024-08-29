const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blog.route");
const errorController = require("./controllers/error.controller");
const sequelize = require("./utils/database.util");

const app = express();

// db.execute("SELECT * FROM blog")
//   .then((result) => {
//     console.log("Result:", result);
//   })
//   .catch((err) => {
//     console.log("blog data table error:", err);
//   });

// Middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for static file
app.use(
  express.static(path.join(path.dirname(require.main.filename), "public"))
);

// Middleware For Ejs Template
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware For Routes
app.use(blogRoutes);
app.use(errorController.routeNotFound404);

sequelize
  .sync()
  .then((result) => {
    // console.log("🚀 ~ result:", result);
    app.listen(3000, () => console.log("Server is running on port 3000"));
  })
  .catch((err) => console.log("Connecting to Sequelize DB Error:", err));
