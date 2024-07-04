const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Hello World!");
});
app.get("/api", () => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end("Hello api!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${port}`);
});
