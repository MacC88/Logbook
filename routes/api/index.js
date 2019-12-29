const router = require("express").Router();
const logRoutes = require("./logs");

// Book routes
router.use("/logs", logRoutes);

module.exports = router;
