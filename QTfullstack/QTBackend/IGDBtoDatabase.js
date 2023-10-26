import igdb from 'igdb-api-node'
import dotenv from 'dotenv'
import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

dotenv.config()

let offset = 170000

async function importGames(offset) {
    const response = await igdb.default(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_APP_ACCESS_TOKEN)
        .fields(['name',
            'summary',
            'platforms.name',
            'genres.name',
            'involved_companies.company.name',
            'involved_companies.developer',
            'involved_companies.publisher',
            'first_release_date'])
        .limit(500)
        .offset(offset)
        .request('/games')

    let games = []

    // console.log(response.data[0])

    for (const responseGame of response.data) {
        // console.log(responseGame.first_release_date)
        // console.log(responseGame)
        const developers = []
        const publishers = []

        try {
            for (const company of responseGame.involved_companies) {
                if (company.developer) {
                    developers.push(company.company.name)
                }
                if (company.publisher) {
                    publishers.push(company.company.name)
                }
            }
        } catch (e) {
            console.log("Error with involved_companies: " + e.message)
        }

        let releaseYear = "N/A"
        try {
            releaseYear = new Date(responseGame.first_release_date * 1000).getFullYear();
        } catch (e) {
            console.log("Error with releaseYear: " + e.message)
        }

        const platforms = []
        try {
            for (const platform of responseGame.platforms) {
                platforms.push(platform.name)
            }
        } catch (e) {
            console.log("Error with platforms: " + e.message)
        }

        const game = {
            'title': responseGame.name,
            'summary': responseGame.summary ? responseGame.summary : "N/A",
            'developers': developers,
            'publishers': publishers,
            'releaseYear': isNaN(releaseYear) ? "N/A" : releaseYear,
            'platforms': platforms,
            'templates': []
        }

        games.push(game)
    }
    addFiveHundredGames(games)
}

// console.log(game)

async function addGame(game) {
    const client = new mongodb.MongoClient(process.env.QUESTTRACKR_DB_URI)
    try {
        const database = client.db('QTDatabase')
        const games = database.collection('games')

        games.insertOne(game)
    } catch (e) {
        console.log(e.message)
    } finally {
        await client.close()
    }
}

async function addFiveHundredGames(inputGames) {
    const client = new mongodb.MongoClient(process.env.QUESTTRACKR_DB_URI)
    try {
        const database = client.db('QTDatabase')
        const games = database.collection('games')

        games.insertMany(inputGames)
    } catch (e) {
        console.log(e.message)
    } finally {
        await client.close()
    }
}

// addGame(game)
// deleteAllButOOT()
// addFiveHundredGames(games)

async function deleteAllButOOT() {
    const client = new mongodb.MongoClient(process.env.QUESTTRACKR_DB_URI)
    try {
        const database = client.db('QTDatabase')
        const games = database.collection('games')

        games.deleteMany({ "_id": { $nin: [new ObjectId("652f52c3fa72fed7f553edf1")] } })
    } catch (e) {
        console.log(e.message)
    } finally {
        await client.close()
    }
}

while (offset < 254000) {
    await importGames(offset)
    offset += 500
}