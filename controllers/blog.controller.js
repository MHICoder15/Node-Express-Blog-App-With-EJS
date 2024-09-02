const Blog = require("../models/blog.model");

////////////////      FOR SEQUELIZE START     ////////////////
exports.getBlogsData = (req, res, next) => {
  Blog.findAll()
    .then((blogs) => {
      res.render("index", { pageTitle: "Blogs List", path: "/", blogs: blogs });
    })
    .catch((err) => console.log("Fetch Blogs Error:", err));
};

exports.getAddBlog = (req, res, next) => {
  res.render("new-edit-post", {
    pageTitle: "Add New Blog",
    path: "/posts/new",
    editing: false,
  });
};
exports.postAddBlog = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const creationDate = req.body.creationDate;
  req.user
    .createBlog({
      title: title,
      content: content,
      author: author,
      creationDate: creationDate,
    })
    // Blog.create({
    //   title: title,
    //   content: content,
    //   author: author,
    //   creationDate: creationDate,
    //   userId: req.user.id,
    // })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log("Add New Blog Error:", err));
};

exports.getEditBlog = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const blogId = req.params.blogId;
  Blog.findByPk(blogId)
    .then((blogData) => {
      if (!blogData) {
        return res.redirect("/");
      }
      res.render("new-edit-post", {
        pageTitle: "Edit Blog",
        path: "/edit-blog",
        editing: editMode,
        blog: blogData,
      });
    })
    .catch((err) => console.log("Fetch Blog By Id Error:", err));
};
exports.postEditBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const creationDate = req.body.creationDate;
  Blog.findByPk(blogId)
    .then((blog) => {
      blog.title = title;
      blog.content = content;
      blog.author = author;
      blog.creationDate = creationDate;
      return blog.save();
    })
    .then(() => {
      console.log("Blog Updated Successfully.");
      res.redirect("/");
    })
    .catch((err) => console.log("Edit Blog Error:", err));
};

exports.postDeleteBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  Blog.findByPk(blogId)
    .then((blog) => {
      return blog.destroy();
    })
    .then(() => {
      console.log("Blog Deleted Successfully.");
      res.redirect("/");
    })
    .catch((err) => console.log("Delete Blog Error:", err));
  // Blog.destroy({ where: { id: blogId } })
  //   .then(() => {
  //     res.redirect("/");
  //   })
  //   .catch((err) => console.log("Delete Blog Error:", err));
};

exports.postViewBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  // Blog.findAll({ where: { id: blogId } }) // It will give an array
  Blog.findByPk(blogId)
    .then((blog) => {
      if (!blog) {
        return res.redirect("/");
      }
      res.render("show-post", {
        pageTitle: "View Blog",
        path: "/view-blog",
        blog: blog,
      });
    })
    .catch((err) => console.log("Fetch Blog By Id Error:", err));
};
////////////////      FOR SEQUELIZE END     ////////////////

////////////////      FOR MYSQL QUERY START     ////////////////
// exports.getBlogsData = (req, res, next) => {
//   Blog.fetchAll()
//     .then(([blogs]) => {
//       res.render("index", { pageTitle: "Blogs List", path: "/", blogs: blogs });
//     })
//     .catch((err) => console.log("Fetch Blogs Error:", err));
// };

// exports.getAddBlog = (req, res, next) => {
//   res.render("new-edit-post", {
//     pageTitle: "Add New Blog",
//     path: "/posts/new",
//     editing: false,
//   });
// };
// exports.postAddBlog = (req, res, next) => {
//   const title = req.body.title;
//   const content = req.body.content;
//   const author = req.body.author;
//   const creationDate = req.body.creationDate;
//   const blog = new Blog(null, title, content, author, creationDate);
//   blog
//     .save()
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => console.log("Add New Blog Error:", err));
// };

// exports.getEditBlog = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const blogId = req.params.blogId;
//   Blog.findById(blogId)
//     .then(([blogData]) => {
//       if (!blogData) {
//         return res.redirect("/");
//       }
//       res.render("new-edit-post", {
//         pageTitle: "Edit Blog",
//         path: "/edit-blog",
//         editing: editMode,
//         blog: blogData[0],
//       });
//     })
//     .catch((err) => console.log("Fetch Blog By Id Error:", err));
// };
// exports.postEditBlog = (req, res, next) => {
//   const blogId = req.body.blogId;
//   const title = req.body.title;
//   const content = req.body.content;
//   const author = req.body.author;
//   const creationDate = req.body.creationDate;
//   const updateBlog = new Blog(blogId, title, content, author, creationDate);
//   updateBlog
//     .save(blogId)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => console.log("Edit Blog Error:", err));
// };

// exports.postDeleteBlog = (req, res, next) => {
//   const blogId = req.body.blogId;
//   Blog.deleteById(blogId)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => console.log("Delete Blog Error:", err));
// };

// exports.postViewBlog = (req, res, next) => {
//   const blogId = req.body.blogId;
//   Blog.findById(blogId)
//     .then(([blogData]) => {
//       if (!blogData) {
//         return res.redirect("/");
//       }
//       res.render("show-post", {
//         pageTitle: "View Blog",
//         path: "/view-blog",
//         blog: blogData[0],
//       });
//     })
//     .catch((err) => console.log("Fetch Blog By Id Error:", err));
// };
////////////////      FOR MYSQL QUERY END     ////////////////

////////////////      FOR FILE JSON START     ////////////////
// exports.getBlogsData = (req, res, next) => {
//   Blog.fetchAll((blogs) => {
//     res.render("index", { pageTitle: "Blogs List", path: "/", blogs: blogs });
//   });
// };

// exports.getAddBlog = (req, res, next) => {
//   res.render("new-edit-post", {
//     pageTitle: "Add New Blog",
//     path: "/posts/new",
//     editing: false,
//   });
// };
// exports.postAddBlog = (req, res, next) => {
//   const title = req.body.title;
//   const content = req.body.content;
//   const author = req.body.author;
//   const creationDate = req.body.creationDate;
//   const blog = new Blog(null, title, content, author, creationDate);
//   blog
//     .save()
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => console.log("Add New Blog Error:", err));
// };

// exports.getEditBlog = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect("/");
//   }
//   const blogId = req.params.blogId;
//   Blog.findById(blogId, (blogData) => {
//     if (!blogData) {
//       return res.redirect("/");
//     }
//     res.render("new-edit-post", {
//       pageTitle: "Edit Blog",
//       path: "/edit-blog",
//       editing: editMode,
//       blog: blogData,
//     });
//   });
// };
// exports.postEditBlog = (req, res, next) => {
//   const blogId = req.body.blogId;
//   const title = req.body.title;
//   const content = req.body.content;
//   const author = req.body.author;
//   const creationDate = req.body.creationDate;
//   const updateBlog = new Blog(blogId, title, content, author, creationDate);
//   updateBlog
//     .save(blogId)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => console.log("Edit Blog Error:", err));
// };

// exports.postDeleteBlog = (req, res, next) => {
//   const blogId = req.body.blogId;
//   Blog.deleteById(blogId)
//     .then(() => {
//       res.redirect("/");
//     })
//     .catch((err) => console.log("Delete Blog Error:", err));
// };

// exports.postViewBlog = (req, res, next) => {
//   Blog.findById(blogId, (blogData) => {
//     if (!blogData) {
//       return res.redirect("/");
//     }
//     res.render("show-post", {
//       pageTitle: "View Blog",
//       path: "/view-blog",
//       blog: blogData,
//     });
//   });
// };
////////////////      FOR FILE JSON END     ////////////////
