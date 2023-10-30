class User {
    constructor(email, username, password) {
        this.email = email
        this.username = username
        this.password = password
        this.profile = {} //This will be an object with things like bio, age, etc.
        this.templates = []
        this.createdAt = new Date() //today
        this.roles = ['user']
    }
}

export default User