const { Router } = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const createBlog = require("../controllers/blog.controllers/createBlog")
const deleteBlog = require("../controllers/blog.controllers/deleteBlog")

const router = Router()

router.post('/create', authMiddleware, createBlog)
router.post('/delete/:id', authMiddleware, deleteBlog)

module.exports = router
