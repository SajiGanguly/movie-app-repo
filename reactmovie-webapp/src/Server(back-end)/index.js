const express = require("express");
const con = require("express");
const app = express();

app.get("/", (req, resp) => {
  con.query("SELECT *FROM film", (err, results) => {
    if (err) {
      resp.send("error");
    } else {
      resp.send("result");
    }
  });
});

app.listen(3000);
