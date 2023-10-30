import express from "express"
import cors from "cors"
import users from "./api/users.route.js"
import games from "./api/games.route.js"
import jwt from 'jsonwebtoken'

import multer from 'multer'

const app = express()

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

//upload.single('image') //String inside is the name of the input

app.use(cors())
app.use(express.json())

app.use("/api/v1/users", users/*, upload.single('image')*/)
app.use("/api/v1/games", games)
// app.use('/verify/:token', (req, res) => {
//     const {token} = req.params

//     jwt.verify(token, 'ourSecretKey', function(err, decoded) {
//         if (err) {
//             console.log(err);
//             res.send("Email verification failed. The link may be invalid or expired.")
//         } else {
//             res.send("Email verified successfully!")
//         }
//     })
// })

app.use("/login", function(req, res, next) {
    res.render('login')
})

app.use("*", (req, res) => res.status(404).json({ error: "not found" }))

export default app