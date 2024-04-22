import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import users from "./api/users.route.js";
import games from "./api/games.route.js";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session/index.js";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword/index.js";
import EmailPassword from "supertokens-node/recipe/emailpassword/index.js";
import {
  middleware,
  errorHandler,
} from "supertokens-node/framework/express/index.js";
import Dashboard from "supertokens-node/recipe/dashboard/index.js";
import EmailVerification from "supertokens-node/recipe/emailverification/index.js";
import { S3, S3Client } from "@aws-sdk/client-s3";
import bodyParser from "body-parser";
import mulitparty from "multiparty";
import fs from "fs";
import {fileTypeFromBuffer} from "file-type";

dotenv.config();

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2',
});

let emailUserMap = {};

async function getUserUsingEmail(email) {
  // TODO: Check your database for if the email is associated with a user
  // and return that user ID if it is.

  // this is just a placeholder implementation
  return emailUserMap[email];
}

async function saveEmailForUser(email, userId) {
  // TODO: Save email and userId mapping

  // this is just a placeholder implementation
  emailUserMap[email] = userId;
}

supertokens.init({
  framework: "express",
  supertokens: {
    connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
    apiKey: process.env.SUPERTOKENS_API_KEY,
  },
  appInfo: {
    // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
    appName: "QuestTrackr",
    apiDomain: "http://localhost:5000",
    websiteDomain: "http://localhost:3000",
    apiBasePath: "/auth",
    websiteBasePath: "/auth",
  },
  recipeList: [
    ThirdPartyEmailPassword.init({
      signUpFeature: {
        formFields: [
          {
            id: "email",
            validate: async (value) => {
              if (typeof value !== "string") {
                return "Please provide a string input.";
              }
              // since it's not an email, we check for if it's a correct username
              if (value.length < 3) {
                return "Usernames must be at least 3 characters long.";
              }
              if (!value.match(/^[a-zA-Z0-9_-]+$/)) {
                return "Username must contain only alphanumeric, underscore or hyphen characters.";
              }
            },
          },
        ],
      },
      // We have provided you with development keys which you can use for testing.
      // IMPORTANT: Please replace them with your own OAuth keys for production use.
      providers: [
        {
          config: {
            thirdPartyId: "google",
            clients: [
              {
                clientId:
                  "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",
                clientSecret: "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",
              },
            ],
          },
        },
        {
          config: {
            thirdPartyId: "github",
            clients: [
              {
                clientId: "467101b197249757c71f",
                clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd",
              },
            ],
          },
        },
        {
          config: {
            thirdPartyId: "apple",
            clients: [
              {
                clientId: "4398792-io.supertokens.example.service",
                additionalConfig: {
                  keyId: "7M48Y4RYDL",
                  privateKey:
                    "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",
                  teamId: "YWQCXGJRJL",
                },
              },
            ],
          },
        },
      ],
    }),
    Session.init(), // initializes session features
    Dashboard.init(),
  ],
});

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["content-type", ...supertokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(express.json({ type: ["application/json", "text/plain"] }));
app.use(middleware());
app.use(bodyParser.json());

app.use("/api/v1/users", users);
app.use("/api/v1/games", games);

app.use("/login", function (req, res, next) {
  res.render("login");
});

const uploadFile = (buffer, name, type) => {
  const params = {
    Body: buffer,
    Bucket: 'questtrackr',
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.putObject(params);
};

app.post("/upload", async (req, res) => {
  const form = new mulitparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error);
    }
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = await fileTypeFromBuffer(buffer);

      const fileName = "templateImages/" + Date.now().toString() + files.file[0].originalFilename;

      let split = fileName.split(".");
      split.pop();
      const fileNameNoFileType = split.join("");

      await uploadFile(buffer, fileNameNoFileType, type);
      return res.status(200).send("https://questtrackr.s3.us-east-2.amazonaws.com/" + fileName);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  });
});

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

app.use(errorHandler());

export default app;
