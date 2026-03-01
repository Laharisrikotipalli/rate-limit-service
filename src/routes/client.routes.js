const express = require("express");
const router = express.Router();
const { registerClient } = require("../controllers/client.controller");

router.post("/clients", registerClient);

module.exports = router;