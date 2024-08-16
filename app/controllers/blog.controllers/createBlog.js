const blogModel = require("../../models/blog.model");

const createBlog = async (req, res) => {
  try {
    const { title, auther, tags, content } = req.body;
    const blog = new blogModel({
      title,
      auther,
      tags,
      content,
    });
    await blog.save();
    res
      .status(201)
      .json({ success: true, message: "Blog has been successfully created!" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = createBlog
