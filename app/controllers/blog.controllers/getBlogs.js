const blogModel = require("../../models/blog.model");

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = getBlogs;
