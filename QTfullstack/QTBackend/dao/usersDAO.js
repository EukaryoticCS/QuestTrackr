import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let users;

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.db(process.env.USERS_NS).collection("users");
    } catch (e) {
      console.error(
        `Unable to establish a connection handle in usersDAO: ${e}`
      );
    }
  }

  static async getUsers({ filters = null, page = 0, usersPerPage = 20 } = {}) {
    let query;
    if (filters) {
      //Set query up using filters
    }

    let cursor;

    try {
      cursor = await users.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { usersList: [], totalNumUsers: 0 };
    }

    const displayCursor = cursor.limit(usersPerPage).skip(usersPerPage * page);

    try {
      const usersList = await displayCursor.toArray();
      const totalNumUsers = await users.countDocuments(query);

      return { usersList, totalNumUsers };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents: ${e}`
      );
      return { usersList: [], totalNumUsers: 0 };
    }
  }

  static async createUser(user) {
    return await users.insertOne(user);
  }

  static async getUserByUsername(username) {
    return await users.findOne({ username: username });
  }

  static async getUserBySuperTokensId(supertokensId) {
    return await users.findOne({ supertokensId: supertokensId });
  }

  static async updateUser(username, profile) {
    return await users.findOneAndUpdate(
      { username: username },
      { $set: { profile: profile } }
    );
  }

  static async getUserTemplates(username) {
    const user = await this.getUserByUsername(username);
    return user.templates;
  }

  static async addTemplateToProfile(username, template) {
    template._id = new ObjectId();
    return await users.findOneAndUpdate(
      { username: username },
      { $push: { templates: template } }
    );
  }

  static async getTrackingTemplate(username, templateId) {
    const user = await this.getUserByUsername(username);
    return user.templates.find((template) => template._id == templateId);
  }

  static async trackTemplate(username, templateId, checkUpdate) {
    const id = new ObjectId(templateId);
    let update;
    if (checkUpdate.selected) {
      update = {
        $set: {
          "templates.$[template].sections.$[section].checks.$[check].selected":
            checkUpdate.selected,
        },
      };
    } else if (checkUpdate.completed) {
      update = {
        $set: {
          "templates.$[template].sections.$[section].checks.$[check].completed":
            checkUpdate.completed,
        },
      };
    } else {
      //if checkUpdate.collected
      update = {
        $set: {
          "templates.$[template].sections.$[section].checks.$[check].collected":
            checkUpdate.collected,
        },
      };
    }

    return await users.updateOne({ username: username }, update, {
      returnOriginal: false,
      arrayFilters: [
        { "template._id": id },
        { "section.title": checkUpdate.section },
        { "check.name": checkUpdate.name },
      ],
    });
  }

  static async validateUserEmail(username) {
    try {
      return await users.findOneAndUpdate(
        { username: username },
        { $set: { validate: true } }
      );
    } catch (e) {
      console.log("Error validating email in UsersDAO: " + e.message);
    }
  }
}
