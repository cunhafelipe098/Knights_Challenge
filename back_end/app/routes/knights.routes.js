module.exports = app => {
  const knights = require("../controllers/knights.controller.js");

  var router = require("express").Router();

  router.post("/", knights.create);
  router.get("/", knights.findAll);
  router.get("/allKnights", knights.findAllPublished);
  router.get("/:id", knights.findOne);
  router.put("/:id", knights.update);
  router.delete("/:id", knights.delete);
  router.delete("/", knights.deleteAll);

  app.use("/api/knights", router);
};
