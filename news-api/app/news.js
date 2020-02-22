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
  const news = await mysqlDB.getConnection().query('SELECT `id`, `title`, `image`, `datetime` FROM `news`');
  res.send(news);
});

router.get("/:id", async (req, res) => {
  const newOne = await mysqlDB.getConnection().query('SELECT * FROM `news` WHERE `id` = ?', req.params.id);
  
  const newElement = newOne[0];
  if(!newElement) {
    return res.status(404).send({error: 'ID not found'});
  }

  res.send(newElement);
});

router.delete("/:id", async (req, res) => {

});

router.post("/", upload.single("image"), async (req, res) => {

});

module.exports = router;