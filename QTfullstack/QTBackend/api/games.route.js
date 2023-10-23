import express from "express"
import GamesCtrl from "./games.controller.js"

const router = express.Router()

router.route("/").get(GamesCtrl.apiGetGames)
                .post(GamesCtrl.apiCreateGame)

router.route("/:gameId").get(GamesCtrl.apiGetGameById)
                        .patch(GamesCtrl.apiUpdateGame)

router.route("/:gameId/templates").get(GamesCtrl.apiGetGameTemplates)
                                .post(GamesCtrl.apiAddTemplateToGame)

router.route("/:gameId/templates/:templateId").get(GamesCtrl.apiGetTemplateById)

export default router