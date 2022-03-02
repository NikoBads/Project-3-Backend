const { isAuthenticated } = require("../middleware/jwt.middleware");

const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Claim = require("../models/Claim.model");
const Comment = require("../models/Comment.model");
const axios = require("axios");

require("dotenv/config");

router.get("/", (req, res) => {
  Claim.find()
    .populate("creator")
    .populate("comments")
    .then((claimsArr) => {
      res.json({ claimsArr });
    });
});

router.post("/create", isAuthenticated, (req, res) => {
  Claim.create({ ...req.body, creator: req.payload._id }).then((results) => {
    res.json(results);
  });
});

router.get("/search", (req, res) => {
  // console.log(req.query);
  axios
    .get(
      `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${req.query.topic}&key=${process.env.KEY}`
    )
    .then((response) => {
      res.json(response.data);
      // console.log(response);
    })

    .catch((error) => {
      res.json(error.message);
    });
});

module.exports = router;
