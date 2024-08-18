const blogModel = require("../../models/blog.model");

const createBlog = async (req, res) => {
  try {
    const { title, author, tags, content } = req.body;
    const userId = req.user._id;
    const blog = new blogModel({
      title,
      author,
      tags,
      content,
      authorId: userId,
    });
    await blog.save();
    res
      .status(201)
      .json({ success: true, message: `Blog has been successfully created by ${req.user.username}` });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = createBlog;
