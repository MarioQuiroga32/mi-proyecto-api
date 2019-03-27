const express = require("express");
const router = express.Router();

const secure = require("../middlewares/secure.mid");
const picksController = require("../controllers/picks.controller");

router.post("/", secure.isAuthenticated, picksController.createPick);
router.get("/", secure.isAuthenticated, picksController.listPicks);
router.get("/following", secure.isAuthenticated, picksController.listFollowingPicks);
router.get("/:id", secure.isAuthenticated, picksController.getPick);

module.exports = router;
