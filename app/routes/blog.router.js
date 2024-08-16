const { Router } = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const createBlog = require("../controllers/blog.controllers/createBlog")

const router = Router()

router.post('/create', authMiddleware, createBlog)


module.exports = router
