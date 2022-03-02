const router = require("express").Router();
const authRoutes = require("./auth.routes");
const claimsRoutes = require("./claims.routes");

/* GET home page */

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/", authRoutes);
router.use("/claims", claimsRoutes);

module.exports = router;
