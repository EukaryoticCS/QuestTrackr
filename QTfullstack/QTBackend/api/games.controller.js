import Game from "../dao/modules/Game.mjs";
import GamesDAO from "../dao/gamesDAO.js";

export default class GamesCtrl {
  static async apiGetGames(req, res, next) {
    const gamesPerPage = 20;
    //const gamesPerPage = req.query.gamesPerPage ? parseInt(req.query.gamesPerPage, 10) : 20
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;
    const title = req.query.title;

    let filters = { title: title };

    const { gamesList, totalNumGames } = await GamesDAO.getGames({
      filters,
      page,
      gamesPerPage,
    });

    let response = {
      games: gamesList,
      page: page,
      filters: filters,
      entries_per_page: gamesPerPage,
      total_results: totalNumGames,
    };
    res.json(response);
  }

  static async apiCreateGame(req, res, next) {
    try {
      const title = req.body.title;
      const summary = req.body.summary;
      const developers =
        req.body.developers != [] && req.body.developers != null
          ? req.body.developers
          : ["N/A"];
      const publishers =
        req.body.publishers != [] && req.body.publishers != null
          ? req.body.publishers
          : ["N/A"];
      const releaseYear = req.body.releaseYear;
      const platforms = req.body.platforms;

      const gameResponse = await GamesDAO.createGame(
        new Game(title, summary, developers, publishers, releaseYear, platforms)
      );

      res.json({ status: gameResponse });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetGameById(req, res, next) {
    const gameId = req.params.gameId;

    const game = await GamesDAO.getGameByGameId(gameId);
    res.json(game);
  }

  static async apiUpdateGame(req, res, next) {
    try {
      const gameId = req.params.gameId;
      const gameData = req.body.gameData;

      await GamesDAO.updateGame(gameId, gameData);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetGameTemplates(req, res, next) {
    const gameId = req.params.gameId;

    const templates = await GamesDAO.getGameTemplates(gameId);
    res.json({ templates });
  }

  static async apiAddTemplateToGame(req, res, next) {
    try {
      const gameId = req.params.gameId;
      const author = req.body.author;

      const templateId = await GamesDAO.addTemplateToGame(gameId, author);
      res.json({ templateId: templateId });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateTemplate(req, res, next) {
    try {
      const gameId = req.params.gameId;
      const template = req.body.templateData;

      await GamesDAO.updateGameTemplate(gameId, template);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetTemplateById(req, res, next) {
    const gameId = req.params.gameId;
    const templateId = req.params.templateId;

    const template = await GamesDAO.getTemplateById(gameId, templateId);
    res.json({ template });
  }
}
