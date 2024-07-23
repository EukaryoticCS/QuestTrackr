// Constants.js
const productionFrontend = "http://localhost:3000";
const developmentFrontend = "http://localhost:3000";
const productionBackend = "http://localhost:5000";
const developmentBackend = "http://localhost:5000";
export const config =
  process.env.NODE_ENV === "development"
    ? { frontend: developmentFrontend, backend: developmentBackend }
    : { frontend: productionFrontend, backend: productionBackend };
