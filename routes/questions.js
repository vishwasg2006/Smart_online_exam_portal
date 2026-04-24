const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM questions", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json([]);
    }
    res.json(result);
  });
});

module.exports = router;