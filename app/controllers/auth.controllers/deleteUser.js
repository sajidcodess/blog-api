const userModel = require("../../models/user.model");

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    await userModel.findByIdAndDelete(userId);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = deleteUser
