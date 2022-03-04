const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const claimSchema = new Schema(
  {
    title: { type: String, unique: true, required: true, maxlength: 160 },

    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },

    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],

    upVoted: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],

    downVoted: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],

    textualRating: { type: String },

    url: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Claim", claimSchema);
