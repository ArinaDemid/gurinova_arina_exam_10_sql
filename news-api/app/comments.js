const express = require("express");
const mysqlDB = require("../mysqlDB");
const router = express.Router();

router.get("/", async (req, res) => {
  const comments = await mysqlDB.getConnection().query('SELECT * FROM `comments`');

  if (!req.query.news_id) {
    res.send(comments);
  } else {
    const commentsWithQueryID = await mysqlDB.getConnection().query('SELECT * FROM `comments` WHERE `id_new` = ?', req.query.news_id);
    res.send(commentsWithQueryID);
  }
});

router.delete("/:id", async (req, res) => {
  await mysqlDB.getConnection().query('DELETE FROM `comments` WHERE `id` = ?', req.params.id);
  res.send("Comment was deleted!");
});

router.post("/", async (req, res) => {

});

module.exports = router;
