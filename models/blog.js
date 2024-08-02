const fs = require("fs");
const path = require("path");
const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "blogs.json"
);

const getBlogsFromFile = (callback) => {
  fs.readFile(filePath, (err, fileContent) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(fileContent));
    }
  });
};

module.exports = class Blog {
  constructor(id, title, content, author, creationDate) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.creationDate = creationDate;
  }

  static fetchAll(callback) {
    getBlogsFromFile(callback);
  }

  save() {
    getBlogsFromFile((blogs) => {
      if (this.id) {
        const existingBlogIndex = blogs.findIndex(
          (blog) => blog.id === this.id
        );
        const updatedBlogs = [...blogs];
        updatedBlogs[existingBlogIndex] = this;
        fs.writeFile(filePath, JSON.stringify(updatedBlogs), (err) => {
          if (err) console.log("err: ", err);
        });
      } else {
        this.id = Math.random().toString();
        blogs.push(this);
        console.log("🚀 ~ Blog ~ getBlogsFromFile ~ blogs:", blogs);
        fs.writeFile(filePath, JSON.stringify(blogs), (err) => {
          if (err) console.log("err: ", err);
        });
      }
    });
  }

  static findById(id, cb) {
    getBlogsFromFile((blogs) => {
      const blog = blogs.find((u) => u.id === id);
      cb(blog);
    });
  }

  static deleteById(id) {
    getBlogsFromFile((blogs) => {
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      fs.writeFile(filePath, JSON.stringify(updatedBlogs), (err) => {
        if (err) console.log("err: ", err);
      });
    });
  }
};
