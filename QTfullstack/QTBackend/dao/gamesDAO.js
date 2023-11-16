import mongodb from "mongodb";
import dotenv from "dotenv";
import igdb from "igdb-api-node";
import axios from "axios";

dotenv.config();

const ObjectId = mongodb.ObjectId;
let games;
let mobykey = process.env.MOBY_GAMES_API_KEY;

export default class GamesDAO {
  static async injectDB(conn) {
    if (games) {
      return;
    }
    try {
      games = await conn.db(process.env.GAMES_NS).collection("games");
    } catch (e) {
      console.error(
        `Unable to establish a connection handle in gamesDAO: ${e}`
      );
    }
  }

  static async getGames({ filters = null, page = 0, gamesPerPage = 20 } = {}) {
    let query;
    if (filters) {
      //Set query up using filters
    }

    let cursor;

    try {
      cursor = await games.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { gamesList: [], totalNumGames: 0 };
    }

    const displayCursor = cursor.limit(gamesPerPage).skip(gamesPerPage * page);

    try {
      const gamesList = await displayCursor.toArray();
      const totalNumGames = await games.countDocuments(query);

      return { gamesList, totalNumGames };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents: ${e}`
      );
      return { gamesList: [], totalNumGames: 0 };
    }
  }

  static async createGame(game) {
    try {
      return await games.insertOne(game);
    } catch (e) {
      console.error(`Error inserting game: ` + e.message);
      return null;
    }
  }

  static async getGameByGameId(gameId) {
    try {
      let game = await games.findOne({ _id: new ObjectId(gameId) });
      game = { ...game, cover: await this.getGameCover(game.title) };
      return game;
    } catch (e) {
      console.error(`Error finding game: ` + e.message);
      return null;
    }
  }

  static async getGameCover(title) {
    try {
      console.log(title);
      const igdbGame = await igdb
        .default(
          process.env.TWITCH_CLIENT_ID,
          process.env.TWITCH_APP_ACCESS_TOKEN
        )
        .fields(["cover.image_id"])
        .where(`name = "${title}"`)
        .request("/games");

      return `https://images.igdb.com/igdb/image/upload/t_cover_big_2x/${igdbGame.data[0].cover.image_id}.jpg`;
    } catch (e) {
      console.error(`Error finding gameCover: ` + e.message);
      return null;
    }
  }

  static async updateGame(gameId, gameData) {
    try {
      return await games.findOneAndUpdate(
        { _id: new ObjectId(gameId) },
        { $set: gameData },
        { overwrite: true }
      );
    } catch (e) {
      console.error(`Error updating game: ` + e.message);
      return null;
    }
  }

  static async getGameTemplates(gameId) {
    try {
      const game = await this.getGameByGameId(gameId);
      return game.templates;
    } catch (e) {
      console.error(`Game not found: ` + e.message);
      return null;
    }
  }

  static async addTemplateToGame(gameId, template) {
    try {
      return await games.updateOne(
        { _id: new ObjectId(gameId) },
        {
          $push: {
            templates: {
              _id: new ObjectId(),
              title: template.title,
              author: template.author,
              sections: [],
            },
          },
        }
      );
    } catch (e) {
      console.error(`Error adding template: ` + e.message);
      return null;
    }
  }

  static async getTemplateById(gameId, templateId) {
    const game = await this.getGameByGameId(gameId);
    return game.templates.find((template) => template._id == templateId);
  }
}
