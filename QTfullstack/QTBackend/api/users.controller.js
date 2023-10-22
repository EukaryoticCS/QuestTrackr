import User from "../dao/modules/User.mjs"
import UsersDAO from "../dao/usersDAO.js"

export default class UsersCtrl {
    static async apiGetUsers(req, res, next) {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}

        const { usersList, totalNumUsers } = await UsersDAO.getUsers({
            filters,
            page,
            usersPerPage
        })

        let response = {
            users: usersList,
            page: page,
            filters: filters,
            entries_per_page: usersPerPage,
            total_results: totalNumUsers
        }
        res.json(response)
    }

    static async apiCreateUser(req, res, next) {
        try {
            const username = req.body.username
            const email = req.body.email
            const password = req.body.password

            const UserResponse = await UsersDAO.createUser(
                new User(username, email, password)
            )

            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetUserByUsername(req, res, next) {
        const username = req.params.username

        const user = await UsersDAO.getUserByUsername(username)
        res.json(user)
    }

    static async apiChangeUserProfile(req, res, next) {
        try {
            const username = req.body.username
            const profile = req.body.profile

            await UsersDAO.updateUser(username, profile)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetUserTemplates(req, res, next) {
        const username = req.params.username

        const templates = await UsersDAO.getUserTemplates(username)
        res.json({ templates })
    }

    static async apiAddTemplateToProfile(req, res, next) {
        try {
            const username = req.params.username
            const template = req.body.templateData

            await UsersDAO.addTemplateToProfile(username, template)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiTrackTemplate(req, res, next) {
        try {
            const username = req.params.username
            const templateId = req.params.templateId
            const checkUpdate = req.body.checkUpdate

            const returnThing = await UsersDAO.trackTemplate(username, templateId, checkUpdate)
            res.json({ returnThing })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
}