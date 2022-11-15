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

module.exports = router;
