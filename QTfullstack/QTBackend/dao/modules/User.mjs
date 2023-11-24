class User {
  constructor(supertokensId, username) {
    this.supertokensId = supertokensId;
    this.username = username;
    this.profile = {profilePicture: "../assets/png/Defaultpfp.png"}; //This will be an object with things like bio, age, etc.
    this.templates = [];
  }
}

export default User;
