const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    content: { type: String, unique: true, required: true },

    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },

    upVoted: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],

    downVoted: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  },
  {
    timestamps: true,
  }
);

module.exports = model("Comment", commentSchema);
