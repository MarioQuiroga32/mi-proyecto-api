const express = require("express");
const router = express.Router();

const secure = require("../middlewares/secure.mid");
const stocksController = require("../controllers/stocks.controller");

router.get("/", stocksController.getStocks);


module.exports = router;
