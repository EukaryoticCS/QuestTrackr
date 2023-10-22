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
}