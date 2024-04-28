import mongodb from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const ObjectId = mongodb.ObjectId;
let games;

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
    if (filters.title && filters.title.length > 0) {
      query = [
        {
          $search: {
            text: {
              path: "title",
              query: filters.title,
              fuzzy: {},
            },
          },
        },
      ];
    }

    let cursor;

    try {
      cursor = await games.aggregate(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { gamesList: [], totalNumGames: 0 };
    }

    try {
      const gamesList = await cursor
        .skip(gamesPerPage * page)
        .limit(gamesPerPage)
        .toArray();

      const totalNumGames = gamesList.length;

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
      return game;
    } catch (e) {
      console.error(`Error finding game: ` + e.message);
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

  static async addTemplateToGame(gameId, author) {
    try {
      const templateId = new ObjectId();
      await games.updateOne(
        { _id: new ObjectId(gameId) },
        {
          $push: {
            templates: {
              _id: templateId,
              gameId: gameId,
              bgColor: "#000000",
              snapToGrid: true,
              title: `${author}'s Template`,
              author: author,
              layout: [],
              sections: ["Total", "Inventory", "Quests", "Achievements"],
            },
          },
        }
      );
      return templateId;
    } catch (e) {
      console.error(`Error adding template: ` + e.message);
      return null;
    }
  }

  static async updateGameTemplate(gameId, template) {
    try {
      return await games.updateOne(
        { "templates._id": new ObjectId(template._id) },
        {
          $set: {
            "templates.$.title": template.title,
            "templates.$.bgColor": template.bgColor,
            "templates.$.layout": template.layout,
            "templates.$.sections": template.sections,
          },
        }
      );
    } catch (e) {
      console.error(`Error udpating template: ` + e.message);
      return null;
    }
  }

  static async getTemplateById(gameId, templateId) {
    try {
      const game = await this.getGameByGameId(gameId);
      return game.templates.find((template) => template._id == templateId);
    } catch (e) {
      console.error(`Error finding template by id: ` + e.message);
      return null;
    }
  }
}
