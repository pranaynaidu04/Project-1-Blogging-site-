const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");

router.get("/test", function (req, res) {
  res.send({ data: "test api" });
});

//Author creation
router.post("/authors", authorController.createAuthor);

//blog creation
router.post("/blogs", auth.authenticate, blogController.createBlog);

//fetch blogs
router.get("/blogs", auth.authenticate, blogController.getBlogs);

//update blogs
router.put("/blogs/:blogId", auth.authenticate, blogController.updateBlogs);

//delete blogs
router.delete("/blogs/:blogId", auth.authenticate, blogController.deleteBlog);

// delete blogs using query
router.delete("/blogs", auth.authenticate, blogController.deleteBlogByQuery);

//user login
router.post("/login", authorController.loginUser);

// router.all("/*", async function (req, res) {
//   return res.status(404).send({ status: false, message: "Page Not Found" });
// });

module.exports = router;
