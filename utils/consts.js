require("dotenv/config");
console.log(process.env.MONGO_URI);
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost/project3-backend";

module.exports = MONGO_URI;
