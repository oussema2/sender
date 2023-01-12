const express = require("express");
const app = express();
const fileSystem = require("fs");
const path = require("path");
const axios = require("axios");
const FormData = require("form-data");
app.use(express.json());

app.get("/sendfile", (req, res) => {
  var filePath = path.join(__dirname, "/files/fileName.pdf");

  var stat = fileSystem.statSync(filePath);
  var file = fileSystem.createReadStream(filePath);
  const data = new FormData();
  data.append("file", file);
  axios
    .post("http://localhost:4000/recieveFile", data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));

  res.status(200).json({ message: "ok" });
});

app.listen(3000, () => {
  console.log(`Server Started at ${3000}`);
});
