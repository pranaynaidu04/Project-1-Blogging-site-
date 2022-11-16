const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");

router.get("/test", function (req, res) {
  res.send({ data: "test api" });
});

//Author creation
router.post("/authors", authorController.createAuthor);

//blog creation
router.post("/blogs", blogController.createBlog);

//fetch blogs
router.get("/blogs", blogController.getBlogs);

//update blogs
router.put("/blogs/:blogId", blogController.updateBlogs);

//delete blogs
router.delete("/blogs/:blogId", blogController.deleteBlog);

// delete blogs using query
router.delete("/blogs", blogController.deleteBlogByQuery)

//user login 
router.post("/login",authorController.loginUser)

module.exports = router;
