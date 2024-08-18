const { Router } = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const createBlog = require("../controllers/blog.controllers/createBlog");
const deleteBlog = require("../controllers/blog.controllers/deleteBlog");
const getBlogs = require("../controllers/blog.controllers/getBlogs");
const updateBlog = require("../controllers/blog.controllers/updateBlog");

const router = Router();

router.post("/create", authMiddleware, createBlog);
router.delete("/delete/:id", authMiddleware, deleteBlog);
router.put("/update/:id", authMiddleware, updateBlog);
router.get("/", getBlogs);

module.exports = router;
