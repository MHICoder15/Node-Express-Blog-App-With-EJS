////////////////      FOR MONGODB START     ////////////////
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blog.route");
const errorController = require("./controllers/error.controller");
const connectMongoDB = require("./utils/database.util").connectMongoDB;

const app = express();

// Middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for static file
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(path.dirname(require.main.filename), "public")));

// Middleware For Ejs Template
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware For Routes
app.use(blogRoutes);
app.use(errorController.routeNotFound404);

connectMongoDB(() => {
  app.listen(3000, () => console.log("Server is running on port 3000"));
});
////////////////      FOR MONGODB END     ////////////////

////////////////      FOR MYSQL START     ////////////////
// const express = require("express");
// const path = require("path");
// const bodyParser = require("body-parser");
// const blogRoutes = require("./routes/blog.route");
// const errorController = require("./controllers/error.controller");
// const sequelize = require("./utils/database.util");
// const Blog = require("./models/blog.model");
// const User = require("./models/user.model");

// const app = express();

// // db.execute("SELECT * FROM blog")
// //   .then((result) => {
// //     console.log("Result:", result);
// //   })
// //   .catch((err) => {
// //     console.log("blog data table error:", err);
// //   });

// // Middleware for body parser
// app.use(bodyParser.urlencoded({ extended: false }));

// // Middleware for static file
// app.use(express.static(path.join(__dirname, "public")));
// // app.use(express.static(path.join(path.dirname(require.main.filename), "public")));

// // Middleware For Ejs Template
// app.set("view engine", "ejs");
// app.set("views", "views");

// app.use((req, res, next) => {
//   User.findByPk(1)
//     .then((user) => {
//       req.user = user;
//       next();
//     })
//     .catch((err) => {
//       console.log("🚀 ~ User.findByPk ~ err:", err);
//     });
// });

// // Middleware For Routes
// app.use(blogRoutes);
// app.use(errorController.routeNotFound404);

// Blog.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
// User.hasMany(Blog);

// sequelize
//   // .sync({ force: true }) // Used when update db structure
//   .sync()
//   .then((result) => {
//     // console.log("🚀 ~ result:", result);
//     return User.findByPk(1);
//   })
//   .then((user) => {
//     if (!user) {
//       return User.create({ name: "Hasnain", email: "mhicoder@gmail.com" });
//     }
//     return user;
//   })
//   .then((user) => {
//     console.log("🚀 ~ user:", user);
//     app.listen(3000, () => console.log("Server is running on port 3000"));
//   })
//   .catch((err) => console.log("Connecting to Sequelize DB Error:", err));
////////////////      FOR MYSQL END     ////////////////
