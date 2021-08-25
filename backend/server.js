import express from "express"
import cors from "cors"
import library from "./api/library.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/library", library)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app
