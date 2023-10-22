import express from "express"
import cors from "cors"
import users from "./api/users.route.js"
import games from "./api/games.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/users", users)
app.use("/api/v1/games", games)
app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app