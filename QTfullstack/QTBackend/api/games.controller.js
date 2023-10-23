import Game from "../dao/modules/Game.mjs"
import GamesDAO from "../dao/gamesDAO.js"

export default class GamesCtrl {
    static async apiGetGames(req, res, next) {
        const gamesPerPage = req.query.gamesPerPage ? parseInt(req.query.gamesPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10): 0

        let filters = {}

        const {gamesList, totalNumGames} = await GamesDAO.getGames({
            filters,
            page,
            gamesPerPage
        })

        let response = {
            games: gamesList,
            page: page,
            filters: filters,
            entries_per_page: gamesPerPage,
            total_results: totalNumGames
        }
        res.json(response)
    }

    static async apiCreateGame(req, res, next) {
        try {
            const title = req.body.title
            const releaseYear = req.body.releaseYear ? parseInt(req.body.releaseYear, 10) : "N/A"
            const platforms = req.body.platforms

            const GameResponse = await GamesDAO.createGame(
                new Game(title, releaseYear, platforms)
            )

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetGameById(req, res, next) {
        const gameId = req.params.gameId

        const game = await GamesDAO.getGameByGameId(gameId)
        res.json(game)
    }

    static async apiUpdateGame(req, res, next) {
        try {
            const gameId = req.params.gameId
            const gameData = req.body.gameData
            
            await GamesDAO.updateGame(gameId, gameData)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetGameTemplates(req, res, next) {
        const gameId = req.params.gameId

        const templates = await GamesDAO.getGameTemplates(gameId)
        res.json({ templates })
    }

    static async apiAddTemplateToGame(req, res, next) {
        try {
            const gameId = req.params.gameId
            const template = req.body.templateData

            await GamesDAO.addTemplateToGame(gameId, template) 
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetTemplateById(req, res, next) {
        const gameId = req.params.gameId
        const templateId = req.params.templateId
        
        const template = await GamesDAO.getTemplateById(gameId, templateId)
        res.json({ template })
    }
}