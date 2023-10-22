import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let games

export default class GamesDAO {
    static async injectDB(conn) {
        if (games) {
            return
        }
        try {
            games = await conn.db(process.env.GAMES_NS).collection("games")
        } catch (e) {
            console.error(
                `Unable to establish a connection handle in gamesDAO: ${e}`
            )
        }
    }

    static async getGames({
        filters = null,
        page = 0,
        gamesPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            //Set query up using filters
        }

        let cursor

        try {
            cursor = await games
                .find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { gamesList: [], totalNumGames: 0 }
        }

        const displayCursor = cursor.limit(gamesPerPage).skip(gamesPerPage * page)

        try {
            const gamesList = await displayCursor.toArray()
            const totalNumGames = await games.countDocuments(query)
            
            return { gamesList, totalNumGames }
        } catch (e) {
            console.error(
                `Unable to convert cursor to array or problem counting documents: ${e}`
            )
            return { gamesList: [], totalNumGames: 0 }
        }
    }

    static async createUser(user) {
        games.insertOne(user);
    }
}