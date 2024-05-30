const express = require("express");
const router = express.Router();
const blogController = require("../controllers/BlogController.js");

router.get("/", blogController.index);
router.get("/create", blogController.create);
router.get("/:slug/download", blogController.downloadImg);
router.get("/:slug", blogController.show);

module.exports = router;