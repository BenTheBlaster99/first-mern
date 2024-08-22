const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  tags: { type: [String], default: [] },
  isPinned: { type: Boolean, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId,ref:"User", required: true },
  createdOn: { type: Date, default: new Date().getTime() },
});
module.exports = mongoose.model("Note", noteSchema);
