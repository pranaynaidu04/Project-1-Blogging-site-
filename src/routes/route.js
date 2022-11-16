const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const authenticate = require("../middleware/auth")

router.get("/test", function (req, res) {
  res.send({ data: "test api" });
});

//Author creation
router.post("/authors", authorController.createAuthor);

//blog creation
router.post("/blogs", authenticate.authenticate, blogController.createBlog);

//fetch blogs
router.get("/blogs",authenticate.authenticate, blogController.getBlogs);

//update blogs
router.put("/blogs/:blogId",authenticate.authenticate, blogController.updateBlogs);

//delete blogs
router.delete("/blogs/:blogId",authenticate.authenticate, blogController.deleteBlog);

// delete blogs using query
router.delete("/blogs",authenticate.authenticate, blogController.deleteBlogByQuery)

//user login 
router.post("/login",authorController.loginUser)

module.exports = router;
