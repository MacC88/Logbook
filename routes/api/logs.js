const router = require("express").Router();
const logsController = require("../../controllers/logsController");

// Matches with "/api/books"
router.route("/")
  .get(logsController.findAll)
  .post(logsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(logsController.findById)
  .put(logsController.update)
  .delete(logsController.remove);

module.exports = router;
