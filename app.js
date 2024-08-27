const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blog.route");
const errorController = require("./controllers/error.controller");
// const db = require("./utils/database");

const app = express();

// db.execute("SELECT * FROM blog_data")
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

app.listen(3000, () => console.log("Server is running on port 3000"));
