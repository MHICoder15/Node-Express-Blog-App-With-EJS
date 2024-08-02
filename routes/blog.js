const express = require("express");
const blogController = require("../controllers/blog");

const router = express.Router();

/*  Route / 
    Method GET 
    Description Home page with a list of blog post */
router.get("/", blogController.getBlogsData);

/*  Route /posts/new
    Method GET 
    Description Create a new blog post form */
router.get("/posts/new", blogController.getAddBlog);

/*  Route /add-blog
    Method POST
    Description Create a new blog post */
router.post("/add-blog", blogController.postAddBlog);

// /posts/:id => GET
router.get("/posts/:blogId/edit", blogController.getEditBlog);

// /edit-blog => POST
router.post("/edit-blog", blogController.postEditBlog);

// /delete-blog => POST
router.post("/delete-blog", blogController.postDeleteBlog);

// /view-blog => POST
router.post("/view-blog", blogController.postViewBlog);

module.exports = router;
