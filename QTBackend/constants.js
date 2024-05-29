// Constants.js
const productionFrontend = "https://QuestTrackr.com";
const developmentFrontend = "http://localhost:3000";
const productionBackend = "http://QuestTrackr.us-east-2.elasticbeanstalk.com";
const developmentBackend = "http://localhost:5000";
export const config =
  process.env.NODE_ENV === "development"
    ? { frontend: developmentFrontend, backend: developmentBackend }
    : { frontend: productionFrontend, backend: productionBackend };
