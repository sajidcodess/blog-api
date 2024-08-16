const blogModel = require("../../models/blog.model");

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const isBlogExist = await blogModel.exists({ _id: id });
    if (!isBlogExist) {
      return res
        .status(404)
        .json({
          success: false,
          message: "The blog with this ID is not found",
        });
    }
    await blogModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({
        success: true,
        message: "The blog has been successfully deleted",
      });
  } catch (error) {
    res.status(400).json({ success: false, error: error.messaga });
  }
};

module.exports = deleteBlog;
