////////////////      FOR MONGOOSE START     ////////////////
const mongoose = require("mongoose");

const blogScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    creationDate: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogScheme);
////////////////      FOR MONGOOSE END     ////////////////

////////////////      FOR MONGODB START     ////////////////
// const getDB = require("../utils/database.util").getDB;
// const mongodb = require("mongodb");

// module.exports = class Blog {
//   constructor(title, content, author, creationDate, id) {
//     this.title = title;
//     this.content = content;
//     this.author = author;
//     this.creationDate = creationDate;
//     this._id = id ? new mongodb.ObjectId(id) : null;
//   }
//   save() {
//     const db = getDB();
//     let dbOp;
//     if (this._id) {
//       dbOp = db
//         .collection("blogs")
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection("blogs").insertOne(this);
//     }
//     return dbOp
//       .then((blog) => {
//         console.log("🚀 ~ Blog ~ save ~ blog:", blog);
//       })
//       .catch((error) => {
//         console.log("🚀 ~ Blog ~ save ~ error:", error);
//       });
//   }

//   static findAll() {
//     const db = getDB();
//     return db
//       .collection("blogs")
//       .find()
//       .toArray()
//       .then((blogs) => {
//         console.log("🚀 ~ Blog ~ findAll ~ blogs:", blogs);
//         return blogs;
//       })
//       .catch((error) => {
//         console.log("🚀 ~ Blog ~ findAll ~ error:", error);
//       });
//   }

//   static findById(blogId) {
//     const db = getDB();
//     return db
//       .collection("blogs")
//       .find({ _id: mongodb.ObjectId.createFromHexString(blogId) })
//       .next()
//       .then((blog) => {
//         console.log("🚀 ~ Blog ~ findById ~ blogs:", blog);
//         return blog;
//       })
//       .catch((error) => {
//         console.log("🚀 ~ Blog ~ findById ~ error:", error);
//       });
//   }

//   static deleteById(blogId) {
//     const db = getDB();
//     return db
//       .collection("blogs")
//       .deleteOne({ _id: new mongodb.ObjectId(blogId) })
//       .then((blog) => {
//         console.log("🚀 ~ Blog ~ deleteById ~ blog:", blog);
//       })
//       .catch((error) => {
//         console.log("🚀 ~ Blog ~ deleteById ~ error:", error);
//       });
//   }
// };
////////////////      FOR MONGODB END     ////////////////

////////////////      FOR SEQUELIZE QUERY START     ////////////////
// const { Sequelize } = require("sequelize");
// const sequelize = require("../utils/database.util");

// const Blog = sequelize.define("blog", {
//   id: {
//     type: Sequelize.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   title: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   content: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   author: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
//   creationDate: {
//     type: Sequelize.STRING,
//     allowNull: false,
//   },
// });

// module.exports = Blog;
////////////////      FOR SEQUELIZE QUERY END     ////////////////

////////////////      FOR MYSQL QUERY START     ////////////////
// const db = require("../utils/database.util");
// module.exports = class Blog {
//   constructor(id, title, content, author, creationDate) {
//     this.id = id;
//     this.title = title;
//     this.content = content;
//     this.author = author;
//     this.creationDate = creationDate;
//   }

//   static fetchAll() {
//     return db.execute("SELECT * FROM blog");
//   }

//   save(blogId) {
//     if (blogId) {
//       return db.execute(
//         "UPDATE blog SET title = ?,content = ? ,author = ?, creationDate = ? WHERE id = ?",
//         [this.title, this.content, this.author, this.creationDate, blogId]
//       );
//     } else {
//       return db.execute(
//         "INSERT INTO blog (title, content, author, creationDate) VALUES(?, ?, ?, ?)",
//         [this.title, this.content, this.author, this.creationDate]
//       );
//     }
//   }

//   static findById(id) {
//     return db.execute("SELECT * FROM blog WHERE blog.id = ?", [id]);
//   }

//   static deleteById(id) {
//     return db.execute("DELETE FROM blog WHERE blog.id = ?", [id]);
//   }
// };
////////////////      FOR MYSQL QUERY END     ////////////////

////////////////      FOR FILE JSON START     ////////////////
// const fs = require("fs");
// const path = require("path");
// const filePath = path.join(
//   path.dirname(require.main.filename),
//   "data",
//   "blogs.json"
// );
// const getBlogsFromFile = (callback) => {
//   fs.readFile(filePath, (err, fileContent) => {
//     if (err) {
//       callback([]);
//     } else {
//       callback(JSON.parse(fileContent));
//     }
//   });
// };
// module.exports = class Blog {
//   constructor(id, title, content, author, creationDate) {
//     this.id = id;
//     this.title = title;
//     this.content = content;
//     this.author = author;
//     this.creationDate = creationDate;
//   }
//   static fetchAll(callback) {
//     getBlogsFromFile(callback);
//   }
//   save() {
//     getBlogsFromFile((blogs) => {
//       if (this.id) {
//         const existingBlogIndex = blogs.findIndex(
//           (blog) => blog.id === this.id
//         );
//         const updatedBlogs = [...blogs];
//         updatedBlogs[existingBlogIndex] = this;
//         fs.writeFile(filePath, JSON.stringify(updatedBlogs), (err) => {
//           if (err) console.log("err: ", err);
//         });
//       } else {
//         this.id = Math.random().toString();
//         blogs.push(this);
//         console.log("🚀 ~ Blog ~ getBlogsFromFile ~ blogs:", blogs);
//         fs.writeFile(filePath, JSON.stringify(blogs), (err) => {
//           if (err) console.log("err: ", err);
//         });
//       }
//     });
//   }
//   static findById(id, cb) {
//     getBlogsFromFile((blogs) => {
//       const blog = blogs.find((u) => u.id === id);
//       cb(blog);
//     });
//   }
//   static deleteById(id) {
//     getBlogsFromFile((blogs) => {
//       const updatedBlogs = blogs.filter((blog) => blog.id !== id);
//       fs.writeFile(filePath, JSON.stringify(updatedBlogs), (err) => {
//         if (err) console.log("err: ", err);
//       });
//     });
//   }
// };
////////////////      FOR FILE JSON END     ////////////////
