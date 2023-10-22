import express from "express"
import GamesCtrl from "./games.controller.js"

const router = express.Router()

router.route("/").get(GamesCtrl.apiGetGames)
                // .post(GamesCtrl.apiCreateGame)

export default router