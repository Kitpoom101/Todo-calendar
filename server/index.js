import express from "express"
import "dotenv/config";// so express can read .env
import cors from "cors";// read different port
import Database from "better-sqlite3";// database

const app = express();
const db = new Database("date.db");
db.pragma("journal_mode = WAL");// WAL = Write-Ahead Logging (faster read and write)

// database setup here
const createTable = db.transaction(() => {
  db.prepare(

  )
})
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
    console.log(`✅ Backend is running on: http://localhost:${PORT}\n`)
});

console.log("Connected to DB:", process.env.DATABASE_NAME);
