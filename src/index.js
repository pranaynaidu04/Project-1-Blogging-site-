const express = require("express");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const app = express();
const route = require("./routes/route");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://pranaynaidu04:pranay482@pranayproject.2jetgiq.mongodb.net/test",
    { useNewUrlParser: true }
  )
  .then(() => console.log("project1 Mongodb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("App running on port : " + (process.env.PORT || 3000));
});
