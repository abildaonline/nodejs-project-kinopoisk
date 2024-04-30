const express = require("express");
const router = express.Router();
const { getAllgenres } = require("./controller");
const writeDataGengre = require("./seed");

router.get("/api/genre", getAllgenres);

writeDataGengre();

module.exports = router;
