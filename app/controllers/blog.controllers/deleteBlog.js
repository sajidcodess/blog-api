const blogModel = require("../../models/blog.model");

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const blog = await blogModel.findOneAndDelete({
      _id: id,
      authorId: userId,
    });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message:
          `The blog with this ID and created by author: ${req.user.username} is not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: "The blog has been successfully deleted",
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.messaga });
  }
};

module.exports = deleteBlog;
