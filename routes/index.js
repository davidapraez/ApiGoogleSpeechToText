const express = require("express");
const speechTextRouter = require("./speechText.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/v1", router);
  // ---- usamos router ----
  router.use("/transcribe", speechTextRouter);
}

module.exports = routerApi;
