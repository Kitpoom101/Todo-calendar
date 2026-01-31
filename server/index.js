import express from "express"
import "dotenv/config";// so express can read .env
import cors from "cors";// read different port
import Database from "better-sqlite3";// database

const app = express();
const db = new Database("todo.db");
db.pragma("journal_mode = WAL");// WAL = Write-Ahead Log (faster read and write)

const createTable = db.transaction(() => {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS todo (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        date TEXT NOT NULL
    )
    `).run();
})

createTable();

app.use(express.json());
app.use(cors())// allow other port

app.get("/api/todo", (req, res) => {
  const todos = db.prepare(`
    SELECT * FROM todo
  `).all();

  res.json(todos);
});

app.post("/api/todo", (req, res) => {
    const { title, date } = req.body;

    console.log("Recieved:", title, date);
    const stmt = db.prepare(`
        INSERT INTO todo (title, date)
        VALUES (?, ?)
    `);

    const result = stmt.run(title, date);

    res.status(201).json({
        message: "Todo received",
        data: { title, date },
    });
})



const PORT = process.env.PORT;
app.listen(PORT, () =>{
    // check PORT
    console.log(`✅ Backend is running on: http://localhost:${PORT}/api/todo\n`)
});

console.log("Connected to DB:", process.env.DATABASE_NAME);
