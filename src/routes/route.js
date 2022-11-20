const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorController");
const blogController = require("../controller/blogController");
const auth = require("../middleware/auth");

router.get("/test", function (req, res) {
  res.send({ data: "test api" });
});

/*****************************Create Author**************************************/
router.post("/authors", authorController.createAuthor);

/*****************************Author Login**************************************/
router.post("/login", authorController.loginUser);

/*****************************Create Blog**************************************/
router.post("/blogs", auth.authenticate, blogController.createBlog);

/*****************************Get Blog**************************************/
router.get("/blogs", auth.authenticate, blogController.getBlogs);

/*****************************Update Blog using path params**************************************/
router.put("/blogs/:blogId", auth.authenticate, blogController.updateBlogs);

/*****************************Delete Blog using path params**************************************/
router.delete("/blogs/:blogId", auth.authenticate, blogController.deleteBlog);

/*****************************Delete Blog using Query params**************************************/
router.delete("/blogs", auth.authenticate, blogController.deleteBlogByQuery);

/***************************** Path not match**************************************/
router.all("/*", async function (req, res) {
  return res.status(404).send({ status: false, message: "Page Not Found" });
});

module.exports = router;
