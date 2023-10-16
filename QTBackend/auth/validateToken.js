import dotenv from "dotenv"
import express from "express"
import jwt from "jsonwebtoken"

dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Validation server running on port ${port}...`)
})

//validateToken() is treated as middleware -- runs before app.get()
app.get("/posts", validateToken, (req, res)=> {
    console.log("Token is valid")
    console.log(req.user.user)
    res.send(`${req.user.user} successfully accessed post`)
})

function validateToken(req, res, next) {
    //get token from request header
    const authHeader = req.headers["authorization"]
    const token = authHeader.split(" ")[1]
    //The request header contains the token "Bearer <token>", 
    //split the string and use second value in split array

    if (token == null) {
        res.sendStatus(400).send("Token not present")
        return
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            res.status(403).send("Token invalid")
        } else {
            req.user = user //user contains name, iat (issued at), and exp (expires at)
            next() //proceed to next action in calling function (aka app.get("/posts"))
        }
    })
}