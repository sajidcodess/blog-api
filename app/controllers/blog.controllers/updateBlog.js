const blogModel = require("../../models/blog.model");

const updateBlog = async (req, res) => {
  try {
    if (!validated(req.body)) {
      return res.status(400).json({
        success: false,
        message:
          "Incorrect data type found, please ensure correct types of the data sent",
        types: {
          title: "string",
          content: "string",
          author: "string",
          tags: ["arrayitem", "arrayitem"],
        },
      });
    }
    const { id } = req.params;
    const { title, author, content, tags } = req.body;

    const blog = await blogModel.findOneAndUpdate(
      { _id: id },
      {
        title,
        content,
        author,
        tags,
        updatedAt: Date.now(),
      },
      {
        new: true,
        runValidators: true,
      },
    );
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog with this ID not found" });
    }

    res.status(200).json({
      sucess: true,
      message: "The blog has successfully been updated",
      updatedData: blog,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// let's manually type check and not install a package for type/data validation.
const validated = ({ title, author, content, tags }) => {
  if (title && typeof title != "string") {
    return false;
  }
  if (content && typeof content != "string") {
    return false;
  }
  if (author && typeof author != "string") {
    return false;
  }

  if (
    tags &&
    (!Array.isArray(tags) || !tags.every((tag) => typeof tag == "string"))
  ) {
    return false;
  }

  return true;
};

module.exports = updateBlog;
