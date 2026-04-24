console.log("correct back file");

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const questionRoutes = require("./routes/questions");
const resultRoutes = require("./routes/results");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes);
app.get("/test", (req, res) => {
  res.send("SERVER NEW FILE WORKING ✅");
});

app.get("/api/questions", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT DISTINCT * FROM questions");
    res.json(rows);
  } catch (error) {
    console.error("Question fetch error:", error);
    res.status(500).json({ error: "DB error" });
  }
});

app.listen(9000, () => {
  console.log("🚀 Server running on http://localhost:9000");
});
app.post("/api/questions/add", async (req, res) => {
  try {
    const { question, option1, option2, option3, option4, answer } = req.body;

    await db.query(
      `INSERT INTO questions (question, option1, option2, option3, option4, answer)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [question, option1, option2, option3, option4, answer]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Add question error:", error);
    res.status(500).json({ success: false });
  }
});

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});