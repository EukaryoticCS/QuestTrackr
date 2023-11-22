import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import users from "./api/users.route.js";
import games from "./api/games.route.js";
import supertokens from "supertokens-node";
import Session from "supertokens-node/recipe/session/index.js";
import ThirdPartyEmailPassword from "supertokens-node/recipe/thirdpartyemailpassword/index.js";
import { middleware, errorHandler } from "supertokens-node/framework/express/index.js";
import Dashboard from "supertokens-node/recipe/dashboard/index.js";
import EmailVerification from "supertokens-node/recipe/emailverification/index.js";

dotenv.config();

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
    EmailVerification.init({
      mode: "OPTIONAL",
    }),
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

app.use(express.json());
app.use(middleware());

app.use("/api/v1/users", users);
app.use("/api/v1/games", games);

app.use("/login", function (req, res, next) {
  res.render("login");
});

app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

app.use(errorHandler());

export default app;
