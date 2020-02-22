const express = require("express");
const cors = require("cors");
// const news = require("./app/news");
// const comments = require("./app/comments");
const mysqlDB = require('./mysqlDB');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

// app.use("/news", news);
// app.use("/comments", comments);

const run = async () => {
  await mysqlDB.connect();

  app.listen(port, () => {
    console.log(`HTTP Server started on${port} port!`);
  });

  process.on('exit', () => {
    mysqlDB.disconnect();
  });
};

run().catch(e => {
  console.log(e);
});
