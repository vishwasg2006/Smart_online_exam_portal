const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", (req, res) => {
  res.send({message:"Login working"});
  const studentId = req.body.studentId.trim().toUpperCase();
  const password = req.body.password.trim();

  db.query(
    "SELECT * FROM students WHERE TRIM(student_id)=? AND TRIM(password)=?",
    [studentId, password],
    (err, result) => {
      if (err) {
        console.log("SQL ERROR =", err);
        return res.status(500).json({
          success: false
        });
      }

      console.log("SQL RESULT =", result);

      if (result.length > 0) {
        return res.json({
          success: true,
          user: result[0]
        });
      }

      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }
  );
});

module.exports = router;