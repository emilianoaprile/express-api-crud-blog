const express = require("express");
const router = express.Router();
const blogController = require("../controllers/BlogController.js");
const multer = require("multer");
const uploader = multer({dest: "public/imgs/posts/"});

router.get("/", blogController.index);
router.post("/create", uploader.single("image"), blogController.create);
router.get("/:slug/download", blogController.downloadImg);
router.get("/:slug", blogController.show);

module.exports = router;