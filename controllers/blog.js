const Blog = require("../models/blog");

// Get all the blog data
exports.getBlogsData = (req, res, next) => {
  Blog.fetchAll((blogs) => {
    res.render("index", { pageTitle: "Blogs List", path: "/", blogs: blogs });
  });
};

// Get the blog form
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
  const blog = new Blog(null, title, content, author, creationDate);
  blog.save();
  res.redirect("/");
};

exports.getEditBlog = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const blogId = req.params.blogId;
  Blog.findById(blogId, (blogData) => {
    if (!blogData) {
      return res.redirect("/");
    }
    res.render("new-edit-post", {
      pageTitle: "Edit Blog",
      path: "/edit-blog",
      editing: editMode,
      blog: blogData,
    });
  });
};

exports.postEditBlog = (req, res, next) => {
  console.log("🚀 ~ req:", req);
  const blogId = req.body.blogId;
  const title = req.body.title;
  const content = req.body.content;
  const author = req.body.author;
  const creationDate = req.body.creationDate;
  const updateBlog = new Blog(blogId, title, content, author, creationDate);
  updateBlog.save();
  res.redirect("/");
};

exports.postDeleteBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  Blog.deleteById(blogId);
  res.redirect("/");
};

exports.postViewBlog = (req, res, next) => {
  const blogId = req.body.blogId;
  Blog.findById(blogId, (blogData) => {
    if (!blogData) {
      return res.redirect("/");
    }
    res.render("show-post", {
      pageTitle: "View Blog",
      path: "/view-blog",
      blog: blogData,
    });
  });
};
