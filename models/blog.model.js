const db = require("../utils/database.util");
module.exports = class Blog {
  constructor(id, title, content, author, creationDate) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.creationDate = creationDate;
  }

  static fetchAll() {
    return db.execute("SELECT * FROM blog_data");
  }

  save(blogId) {
    if (blogId) {
      return db.execute(
        "UPDATE blog_data SET blog_data.title = ?,blog_data.content = ? ,blog_data.author = ?, blog_data.creationDate = ? WHERE blog_data.id = ?",
        [this.title, this.content, this.author, this.creationDate, blogId]
      );
    } else {
      return db.execute(
        "INSERT INTO blog_data (title, content, author, creationDate) VALUES(?, ?, ?, ?)",
        [this.title, this.content, this.author, this.creationDate]
      );
    }
  }

  static findById(id) {
    return db.execute("SELECT * FROM blog_data WHERE blog_data.id = ?", [id]);
  }

  static deleteById(id) {
    return db.execute("DELETE FROM blog_data WHERE blog_data.id = ?", [id]);
  }
};

////////////////      FOR FILE DIRECTORY DATA START     ////////////////
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
////////////////      FOR FILE DIRECTORY DATA END     ////////////////
