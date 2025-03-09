// Constants.js
const productionFrontend = "https://questtrackr.com";
const developmentFrontend = "http://localhost:3000";
const productionBackend = "https://questtrackrbackend.com";
const developmentBackend = "http://localhost:5000";
export const config =
  process.env.NODE_ENV === "development"
    ? { frontend: developmentFrontend, backend: developmentBackend }
    : { frontend: productionFrontend, backend: productionBackend };
