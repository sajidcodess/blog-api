const { Schema, default: mongoose } = require("mongoose");

const blogSchema = new Schema({
  title: { type: String, required: true },
  auther: { type: String, required: true },
  tags: { type: [String] },
  content: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
});

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
