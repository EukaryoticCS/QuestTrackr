// Constants.js
const productionFrontendDomains = [
  "https://questtrackr.com",
  "https://www.questtrackr.com",
  "https://www.questtrackr.onrender.com",
];
const developmentFrontend = "http://localhost:3000";
const productionBackend = "https://questtrackrbackend.com";
const developmentBackend = "http://localhost:5000";

export const config =
  process.env.NODE_ENV === "development"
    ? {
        frontend: developmentFrontend,
        frontendDomains: [developmentFrontend],
        backend: developmentBackend,
      }
    : {
        frontend: productionFrontendDomains[0],
        frontendDomains: productionFrontendDomains,
        backend: productionBackend,
      };
