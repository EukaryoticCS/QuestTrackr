class Game {
    constructor(title, releaseYear, platforms) {
        this.title = title
        this.releaseYear = releaseYear
        this.platforms = platforms
        this.templates = []
    }

    addTemplate(template) {
        this.templates.push(template)
    }

    removeTemplate(templateId) {
        this.templates = this.templates.filter(template => template.id !== templateId)
    }
}

export default Game