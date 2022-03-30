var express = require("express");
var app = express();

var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

const PORT = process.env.PORT || 8000;
const INVALID = "Invalid Date";

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api", (req, res) => {
  let date = new Date();
  res.json({ unix: date - 0, utc: date.toUTCString() });
});

app.get("/api/:time", (req, res) => {
  try {
    let { time } = req.params;
    let date = new Date(time);
    if (date == INVALID) {
      date = new Date(parseInt(time));
    }

    if (date == INVALID) {
      res.json({ error: INVALID });
    } else {
      res.json({ unix: date - 0, utc: date.toUTCString() });
    }
  } catch (e) {
    console.error(`Error: ${e.message}`);
    res.json({ error: e.message });
  }
});

var listener = app.listen(PORT, function () {
  console.log(`Your app is listening on port ${PORT}`);
});
