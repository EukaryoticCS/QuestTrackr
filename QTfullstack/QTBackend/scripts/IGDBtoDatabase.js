import igdb from "igdb-api-node";
import dotenv from "dotenv";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

dotenv.config();

let offset = 0;

async function importGames(offset) {
  const response = await igdb
    .default(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_APP_ACCESS_TOKEN)
    .fields([
      "name",
      "summary",
      "platforms.name",
      "genres.name",
      "involved_companies.company.name",
      "involved_companies.developer",
      "involved_companies.publisher",
      "first_release_date",
      "cover.image_id",
    ])
    .limit(500)
    .offset(offset)
    .request("/games");

  let games = [];

  for (const responseGame of response.data) {
    const developers = [];
    const publishers = [];

    if (responseGame.involved_companies) {
      try {
        for (const company of responseGame.involved_companies) {
          if (company.developer) {
            developers.push(company.company.name);
          }
          if (company.publisher) {
            publishers.push(company.company.name);
          }
        }
      } catch (e) {
        console.log("Error with involved_companies: " + e.message);
      }
    }

    let releaseYear = "N/A";
    if (response.first_release_date) {
      try {
        releaseYear = new Date(
          responseGame.first_release_date * 1000
        ).getFullYear();
      } catch (e) {
        console.log("Error with releaseYear: " + e.message);
      }
    }

    const platforms = [];
    if (responseGame.platforms) {
      try {
        for (const platform of responseGame.platforms) {
          platforms.push(platform.name);
        }
      } catch (e) {
        console.log("Error with platforms: " + e.message);
      }
    }

    let cover = "/NoCoverFound.png";
    if (responseGame.cover) {
      try {
        cover =
          "http://images.igdb.com/igdb/image/upload/t_cover_big_2x/" +
          responseGame.cover.image_id +
          ".jpg";
      } catch (e) {
        console.log("Error with cover: " + e.message);
      }
    }

    const game = {
      title: responseGame.name,
      summary: responseGame.summary ? responseGame.summary : "N/A",
      developers: developers,
      publishers: publishers,
      releaseYear: isNaN(releaseYear) ? "N/A" : releaseYear,
      platforms: platforms,
      cover: cover,
      templates: [],
    };

    games.push(game);
  }
  addFiveHundredGames(games);
}

async function addGame(game) {
  const client = new mongodb.MongoClient(process.env.QUESTTRACKR_DB_URI);
  try {
    const database = client.db("QTDatabase");
    const games = database.collection("games");

    await games.insertOne(game);
  } catch (e) {
    console.log(e.message);
  } finally {
    await client.close();
  }
}

async function addFiveHundredGames(inputGames) {
  if (inputGames.length > 0) {
    console.log("Adding batch " + offset / 500 + "!");
    const client = new mongodb.MongoClient(process.env.QUESTTRACKR_DB_URI);
    try {
      const database = client.db("QTDatabase");
      const games = database.collection("games");

      await games.insertMany(inputGames);
    } catch (e) {
      console.log(e.message);
    } finally {
      await client.close();
    }
  } else {
    console.log("Batch " + offset / 500 + " is empty!");
  }
}

async function deleteAllButOOT() {
  console.log("Deleting all but OOT!");
  const client = new mongodb.MongoClient(process.env.QUESTTRACKR_DB_URI);
  try {
    const database = client.db("QTDatabase");
    const games = database.collection("games");

    await games.deleteMany({
      _id: { $nin: [new ObjectId("652f52c3fa72fed7f553edf1")] },
    });
  } catch (e) {
    console.log(e.message);
  } finally {
    await client.close();
  }
}

async function dumpDatabase() {
  await deleteAllButOOT();
  while (offset < 300000) {
    await importGames(offset);
    offset += 500;
  }
}

dumpDatabase();