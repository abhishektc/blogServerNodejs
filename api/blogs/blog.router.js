const router = require("express").Router();
const { blogList, createBlog, myBlog, deleteMyBlog, updateBlog } = require("./blog.controller");
const { checkToken } = require("../../tokenValidation/tokenValidation");

router.get("/blogList", blogList);
router.get("/myBlog", checkToken, myBlog);
router.post("/create", checkToken, createBlog);
router.delete("/deleteMyBlog/:id", checkToken, deleteMyBlog);
router.patch("/updateBlogById/:id", checkToken, updateBlog);

module.exports = router;