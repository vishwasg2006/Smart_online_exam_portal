const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/save", (req, res) => {
  const { studentId, subject, score, total } = req.body;

  db.query(
    "INSERT INTO results(student_id, subject, score, total) VALUES(?,?,?,?)",
    [studentId, subject, score, total],
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ success: false });
      }
      res.json({ success: true });
    }
  );
});

router.get("/leaderboard", (req, res) => {
  db.query(
    `SELECT s.name, r.subject, r.score, r.total
     FROM results r
     JOIN students s ON s.student_id = r.student_id
     ORDER BY r.score DESC
     LIMIT 10`,
    (err, result) => {
      if (err) return res.status(500).json([]);
      res.json(result);
    }
  );
});

module.exports = router;