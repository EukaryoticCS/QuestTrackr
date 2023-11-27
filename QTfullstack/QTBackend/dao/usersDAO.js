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
    try {
      return await users.insertOne(user);
    } catch (e) {
      console.error(`Error creating user: ` + e.message);
      return null;
    }
  }

  static async getUserByUsername(username) {
    try {
      return await users.findOne({ username: username });
    } catch (e) {
      console.error("Error getting user by username: " + e.message);
      return null;
    }
  }

  static async getUserBySuperTokensId(supertokensId) {
    try {
      return await users.findOne({ supertokensId: supertokensId });
    } catch (e) {
      console.error;
    }
  }

  static async updateUser(username, profile) {
    try {
      return await users.findOneAndUpdate(
        { username: username },
        { $set: { profile: profile } }
      );
    } catch (e) {
      console.error("Error updating user: " + e.message);
      return null;
    }
  }

  static async getUserTemplates(username) {
    //Do I still need this method?
    try {
      const user = await this.getUserByUsername(username);
      return user.templates;
    } catch (e) {
      console.error("Error getting user templates: " + e.message);
      return null;
    }
  }

  static async addTemplateToProfile(username, template) {
    try {
      template._id = new ObjectId();
      const userTemplates = await this.getUserTemplates(username);
      if (
        !userTemplates.some((template) => template.templateId === template.id)
      ) {
        return await users.findOneAndUpdate(
          { username: username },
          { $push: { templates: template } }
        );
      } else {
        console.error("User already has that template!");
        return null;
      }
    } catch (e) {
      console.error("Error adding template to profile: " + e.message);
      return null;
    }
  }

  static async getTrackingTemplate(username, templateId) {
    try {
      const user = await this.getUserByUsername(username);
      const id = new ObjectId(templateId);
      return user.templates.find((template) => id.equals(template._id));
    } catch (e) {
      console.error("Error getting tracking template: " + e.message);
      return null;
    }
  }

  static async trackTemplate(username, templateId, checkUpdate) {
    try {
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
    } catch (e) {
      console.error("Error adding check: " + e.message);
      return null;
    }
  }
}
