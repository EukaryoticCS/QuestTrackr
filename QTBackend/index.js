import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import UsersDAO from "./dao/usersDAO.js"
import GamesDAO from "./dao/gamesDAO.js"

dotenv.config()
const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 5000

MongoClient.connect(
    process.env.QUESTTRACKR_DB_URI, {
        waitQueueTimeoutMS: 2500
    })
    .catch(err => {
        console.log(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await UsersDAO.injectDB(client)
        await GamesDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })