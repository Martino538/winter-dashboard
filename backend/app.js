import express from "express";
import cors from "cors";
import fs from "node:fs/promises";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/data", async (req, res) => {
  const data = await fs.readFile("./data/data.json", "utf-8");
  const users = JSON.parse(data);
  res.json(users);
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
