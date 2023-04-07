const express = require("express");
const app = express();
const axios = require("axios");

app.get("/", (req, res) => {
  if (Array.isArray(req.query.url)) {
    const numbers = [];
    var i = 0;
    req.query.url.map((u) => {
      axios.get(u).then(function (response) {
        i++;
        response.data.numbers.map((i) => {
          numbers.push(i);
        });

        if (i === req.query.url.length) {
          res.status(200).json([...new Set(numbers)]);
        }
      });
    });
  } else {
    axios.get(req.query.url).then(function (response) {
      res.status(200).json(response.data);
    });
  }
});

function uniq(a) {
  return a.sort().filter(function (item, pos, ary) {
    return !pos || item != ary[pos - 1];
  });
}

app.listen(5000, () => {
  console.log("server is listening on port 5000...");
});
