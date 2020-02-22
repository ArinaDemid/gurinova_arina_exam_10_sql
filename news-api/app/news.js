const path = require("path");

const express = require("express");
const multer = require("multer");
const nanoid = require("nanoid");

const mysqlDB = require("../mysqlDB");
const config = require("../config");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, config.uploadPath);
  },
  filename: function(req, file, cb) {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
const router = express.Router();

router.get("/", async (req, res) => {
  
});

router.get("/:id", async (req, res) => {
  
});

router.delete("/:id", async (req, res) => {

});

router.post("/", upload.single("image"), async (req, res) => {

});

module.exports = router;