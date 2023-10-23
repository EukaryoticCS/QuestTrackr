class User {
    constructor(username, email, password) {
        const date = new Date()
        this.username = username
        this.email = email
        this.password = password
        this.profile = {} //This will be an object with things like bio, age, etc.
        this.templates = []
        this.createdAt = date
        this.lastLogin = date
        this.roles = ['user']
    }
}

export default User