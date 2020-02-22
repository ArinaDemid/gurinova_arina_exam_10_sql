const express = require("express");
const mysqlDB = require("../mysqlDB");
const router = express.Router();

router.get("/", async (req, res) => {
  const comments = await mysqlDB
    .getConnection()
    .query("SELECT * FROM `comments`");

  if (!req.query.news_id) {
    res.send(comments);
  } else {
    const commentsWithQueryID = await mysqlDB
      .getConnection()
      .query("SELECT * FROM `comments` WHERE `id_new` = ?", req.query.news_id);
    res.send(commentsWithQueryID);
  }
});

router.delete("/:id", async (req, res) => {
  await mysqlDB
    .getConnection()
    .query("DELETE FROM `comments` WHERE `id` = ?", req.params.id);
  res.send("Comment was deleted!");
});

router.post("/", async (req, res) => {
  const comment = req.body;

  if (!comment.author) {
    req.body.author = "Anonymous";
  }

  if (!comment.comment) {
    res.status(400).send({ error: "Comment must be present in the request" });
  }

  if (!comment.newId) {
    res.status(400).send({ error: "ID_new must be present in the request" });
  } else {
    const searchNewInDB = await mysqlDB
      .getConnection()
      .query("SELECT * FROM `news`");

    if (searchNewInDB.length === 0) {
      res.status(400).send({ error: `New with id ${comment.newId} not found` });
    } else {
      await mysqlDB
        .getConnection()
        .query(
          "INSERT INTO `comments` (`id_new`, `author`, `comment`) VALUES" +
            "(?, ?, ?)",
          [comment.newId, comment.author, comment.comment]
        );
      res.send(comment);
    }
  }
});

module.exports = router;
