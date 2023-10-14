class User {
    constructor(username, email, password) {
        this.username = username
        this.email = email
        this.password = password
        this.profile = {} //This will be an object with things like bio, age, etc.
        this.templates = []
        this.createdAt = new Date()
        this.lastLogin = null
        this.roles = ['user']
    }

    updateProfile(profileData) {
        this.profile = {...this.profile, ...profileData} //Spread syntax -- merges the two together
    }

    addTemplate(templateId) {
        this.templates.push(templateId)
    }

    removeTemplate(templateId) {
        this.templates = this.templates.filter(template => template.id !== templateId)
    }

    getLastLogin() {
        return this.lastLogin
    }

    setLastLogin(date) {
        this.lastLogin = date
    }
}

module.exports = User