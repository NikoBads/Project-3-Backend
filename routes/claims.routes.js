const { isAuthenticated } = require("../middleware/jwt.middleware");

const express = require("express");
const router = express.Router();

const User = require("../models/User.model");
const Claim = require("../models/Claim.model");
const Comment = require("../models/Comment.model");
const axios = require("axios");

require("dotenv/config");

/*
VIEW ALL CLAIMS ROUTE
*/
router.get("/", (req, res) => {
  Claim.find()
    .populate("creator")
    .populate("comments")
    .then((claimsArr) => {
      res.json({ claimsArr });
    });
});

/*
CREATE NEW CLAIM ROUTE
*/
router.post("/create", isAuthenticated, (req, res) => {
  Claim.create({ ...req.body, creator: req.payload._id }).then((results) => {
    res.json(results);
  });
});

/*
SEARCH USING GOOGLE FACTCHECK API
*/
router.get("/search", (req, res) => {
  console.log("req.query here : ", req.query);
  axios
    .get(
      `https://factchecktools.googleapis.com/v1alpha1/claims:search?query=${req.query.topic}&key=${process.env.KEY}`
    )
    .then((response) => {
      res.json(response.data);
      console.log("Here is the response : ", response);
    })

    .catch((error) => {
      res.json(error.message);
    });
});

/*
DELETE A COMMENT
*/
router.delete("/delete/comment/:commentId", (req, res) => {
  Comment.findByIdAndRemove(req.params.commentId).then((results) => {
    res.json(results);
  });
});

/*
VIEW SINGLE CLAIM BY ID ROUTE
*/

router.get("/view/:claimId", (req, res) => {
  Claim.findById(req.params.claimId)
    .populate("creator")
    .populate("comments")
    .then((results) => {
      res.json(results);
    });
});

/*
LEAVE A COMMENT ON A CLAIM
*/

router.post("/comment/:claimId", isAuthenticated, (req, res) => {
  Comment.create({ ...req.body, creator: req.payload._id }).then((results) => {
    console.log(req.params.claimId);
    Claim.findByIdAndUpdate(req.params.claimId, {
      $push: { comments: results._id },
    }).then((results) => {
      res.json(results);
    });
  });
});

/*
VOTE UP A CLAIM
*/

router.post("/upvote/claim/:claimId", isAuthenticated, (req, res) => {
  Claim.findByIdAndUpdate(
    req.params.claimId,
    {
      $addToSet: { upVoted: req.payload._id },
    },
    { new: true }
  ).then((results) => {
    res.json(results);
  });
});

/*
VOTE DOWN A CLAIM
*/

router.post("/downvote/claim/:claimId", isAuthenticated, (req, res) => {
  Claim.findByIdAndUpdate(
    req.params.claimId,
    {
      $addToSet: { downVoted: req.payload._id },
    },
    { new: true }
  ).then((results) => {
    res.json(results);
  });
});

/*
VOTE UP A COMMENT
*/

router.post("/upvote/comment/:commentId", isAuthenticated, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $addToSet: { upVoted: req.payload._id },
    },
    { new: true }
  ).then((results) => {
    res.json(results);
  });
});

/*
VOTE DOWN A COMMENT
*/

router.post("/upvote/comment/:commentId", isAuthenticated, (req, res) => {
  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      $addToSet: { downVoted: req.payload._id },
    },
    { new: true }
  ).then((results) => {
    res.json(results);
  });
});

/*
DELETE SINGLE CLAIM BY ID ROUTE
*/

router.post("/delete/claim/:claimId/", (req, res) => {
  Claim.findByIdAndDelete(req.params.claimId).then((results) => {
    res.json(results);
  });
});

module.exports = router;
