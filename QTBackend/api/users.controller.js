import UsersDAO from "../dao/usersDAO.js"

export default class UsersCtrl {
    static async apiGetUsers(req, res, next) {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage, 10) : 20
        const page = req.query.page ? parseInt(req.query.page, 10): 0

        let filters = {}

        const {usersList, totalNumUsers} = await UsersDAO.getUsers({
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
        let user = req.body
        if (!user.username || !user.email || !user.password) {
            
        }
    }
}