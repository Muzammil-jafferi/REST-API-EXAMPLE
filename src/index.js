import express from "express";
import bodyParser from "body-parser";

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./routes").default(app);

app.listen(5000, function () {
  console.log(`APP LISTENING ON PORT 5000!`);
});
