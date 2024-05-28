import igdb from "igdb-api-node";
import dotenv from "dotenv";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

dotenv.config();

let offset = 0;
let itemsProcessed = 0;
let targetItems = 300000;
const maxConcurrentImports = 5;
const batchSize = 500;
let totalItemsProcessed = 0;
let dbCalls = 0;
let totalDBCalls = 600;

function dispose(client) {
  console.log("Total db calls: " + dbCalls);
  if (++dbCalls >= totalDBCalls) {
    console.log("All batches sent!");
    client.close();
  }
}

async function importGames(offset, client) {
  const response = await igdb
    .default(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_APP_ACCESS_TOKEN)
    .fields([
      "id",
      "name",
      "summary",
      "platforms.name",
      "genres.name",
      "involved_companies.company.name",
      "involved_companies.developer",
      "involved_companies.publisher",
      "first_release_date",
      "cover.image_id",
      "category",
      "keywords.name",
    ])
    .limit(500)
    .offset(offset)
    .request("/games");

  let games = [];

  for (const responseGame of response.data) {
    if (responseGame.keywords) {
      if (
        responseGame.keywords.some(
          (keyword) =>
            keyword.name == "nsfw" ||
            keyword.name == "sexual content" ||
            keyword.name == "fan service" ||
            keyword.name == "nudity"
        )
      ) {
        continue;
      }
    }

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
    if (responseGame.first_release_date) {
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
      IGDBId: responseGame.id,
      title: responseGame.name,
      summary: responseGame.summary ? responseGame.summary : "",
      developers: developers,
      publishers: publishers,
      releaseYear: isNaN(releaseYear) ? "N/A" : releaseYear,
      platforms: platforms,
      cover: cover,
      category: responseGame.category,
    };

    games.push(game);
  }
  const insertedCount = await addFiveHundredGames(games, client);
  return insertedCount;
}

async function addFiveHundredGames(inputGames, client) {
  if (inputGames.length > 0) {
    // console.log("Adding batch " + offset / 500 + "!");
    try {
      const database = client.db("QTDatabase");
      const games = database.collection("games");

      const bulkOps = inputGames.map((game) => ({
        updateOne: {
          filter: { IGDBId: game.IGDBId },
          update: {
            $set: {
              title: game.name,
              summary: game.summary ? game.summary : "",
              developers: game.developers,
              publishers: game.publishers,
              releaseYear: isNaN(game.releaseYear) ? "N/A" : game.releaseYear,
              platforms: game.platforms,
              cover: game.cover,
              category: game.category,
            },
            $setOnInsert: { IGDBId: game.IGDBId, templates: [] },
          },
          upsert: true,
        },
      }));

      const result = await games.bulkWrite(bulkOps).then(dispose());

      return result.matchedCount + result.upsertedCount;
    } catch (e) {
      console.log(e);
    }
  }
  // else {
  //   // console.log("Batch " + offset / 500 + " is empty!");
  //   // totalDBCalls = (offset / 500) - 1;
  // }
}

async function deleteAllButTLOZ(client) {
  console.log("Deleting all but TLOZ!");
  try {
    const database = client.db("QTDatabase");
    const games = database.collection("games");

    await games.deleteMany({
      _id: { $nin: [new ObjectId("656ed4dfaceb24ece043d7a1")] },
    });
  } catch (e) {
    console.log(e.message);
  }
}

async function dumpDatabase() {
  const client = new mongodb.MongoClient(process.env.QUESTTRACKR_DB_URI);
  // await deleteAllButTLOZ(client);
  while (true) {
    const importPromises = [];

    for (let i = 0; i < maxConcurrentImports; i++) {
      offset += batchSize;
      importPromises.push(importGames(offset, client));
    }

    const results = await Promise.all(importPromises);

    const itemsProcessed = results.reduce((acc, val) => acc + val, 0);
    totalItemsProcessed += itemsProcessed;

    console.log(`Processed ${totalItemsProcessed} games so far.`);

    if (itemsProcessed === 0) {
      //No more items in IGDB!
      break;
    }
  }
}

dumpDatabase();
