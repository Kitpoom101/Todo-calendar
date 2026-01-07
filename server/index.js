import express from "express"
import "dotenv/config";// so express can read .env
import cors from "cors";// read different port

const app = express();

app.use(express.json());
app.use(cors())// allow other port

app.get("/", (req, res) => {
    res.json("hello world")
})

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    // check PORT
    console.log(`✅ Backend is running on: http://localhost:${PORT}`)
});
