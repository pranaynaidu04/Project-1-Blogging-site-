const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const auth = require("../middleware/auth")

router.get("/test", function (req, res) {
  res.send({ data: "test api" });
});

//Author creation
router.post("/authors", authorController.createAuthor);

//blog creation
router.post("/blogs", auth.authenticate, blogController.createBlog);

//fetch blogs
router.get("/blogs",auth.authenticate, blogController.getBlogs);

//update blogs
router.put("/blogs/:blogId",auth.authenticate, auth.authorise , blogController.updateBlogs);

//delete blogs
router.delete("/blogs/:blogId",auth.authenticate, auth.authorise, blogController.deleteBlog);

// delete blogs using query
router.delete("/blogs",auth.authenticate, auth.authorise, blogController.deleteBlogByQuery)

//user login 
router.post("/login",authorController.loginUser)

module.exports = router;
