class User {
  constructor(id, username) {
    this.id = id;
    this.username = username;
    this.profile = {}; //This will be an object with things like bio, age, etc.
    this.templates = [];
  }
}

export default User;
